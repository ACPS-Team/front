"use client";

import React, { useState } from 'react';
import { AuthGuard } from "@/components/AuthGuard";
import Dashboard from "@/components/Dashboard";

function PlanePage() {
  const [planes, setPlanes] = useState([
    {
      id: 1,
      immat: "F-BRUM",
      type: "Cessna T210J",
      year: 1969,
      group: "C210",
      htc: "?",
      base: "Toussus le noble",
      oaci: "LFPN",
      remark: "",
      places: 4,
      billing: "COMPTEUR",
      block: "BLOC saisi",
      soloPrice: "296,00 €",
      dualPrice: "296,00 €",
    },
    {
      id: 2,
      immat: "F-HUGY",
      type: "Piper Seneca 1",
      year: 1972,
      group: "PA34",
      htc: "10990h00",
      base: "Toussus le noble",
      oaci: "LFPN",
      remark: "",
      places: 6,
      billing: "BLOC",
      block: "BLOC saisi",
      soloPrice: "496,00 €",
      dualPrice: "496,00 €",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newPlane, setNewPlane] = useState({
    immat: "",
    type: "",
    year: "",
    group: "",
    htc: "",
    base: "",
    oaci: "",
    remark: "",
    places: "",
    billing: "",
    block: "",
    soloPrice: "",
    dualPrice: "",
  });
  const [editPlane, setEditPlane] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [sortByGroup, setSortByGroup] = useState(false);
  const [flightIntent, setFlightIntent] = useState({});
  const [vfrOption, setVfrOption] = useState({});
  const [ifrOption, setIfrOption] = useState({});
  const [engineType, setEngineType] = useState({});

  // Sort planes by group if the sortByGroup option is enabled
  const sortedPlanes = sortByGroup
    ? [...planes].sort((a, b) => a.group.localeCompare(b.group))
    : planes;

  // Filter planes based on the search query and group filter
  const matchingPlanes = sortedPlanes.filter(
    (plane) =>
      (plane.immat.toLowerCase().includes(searchQuery.toLowerCase()) || flightIntent[plane.id] === "non") &&
      (groupFilter === "" || plane.group === groupFilter)
  );
  const nonMatchingPlanes = sortedPlanes.filter(
    (plane) =>
      !(plane.immat.toLowerCase().includes(searchQuery.toLowerCase()) || flightIntent[plane.id] === "non") ||
      (groupFilter !== "" && plane.group !== groupFilter)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "soloPrice" || name === "dualPrice") {
      // Restrict input to numbers and commas, and prevent invalid characters
      const formattedValue = value.replace(/[^0-9,]/g, "");
      if (editPlane) {
        setEditPlane({ ...editPlane, [name]: formattedValue + " €" });
      } else {
        setNewPlane({ ...newPlane, [name]: formattedValue + " €" });
      }
    } else {
      if (editPlane) {
        setEditPlane({ ...editPlane, [name]: value });
      } else {
        setNewPlane({ ...newPlane, [name]: value });
      }
    }
  };

  const handleSave = () => {
    if (
      newPlane.immat &&
      newPlane.type &&
      newPlane.year &&
      newPlane.group &&
      newPlane.htc &&
      newPlane.base &&
      newPlane.oaci &&
      newPlane.places &&
      newPlane.billing &&
      newPlane.block &&
      newPlane.soloPrice &&
      newPlane.dualPrice
    ) {
      setPlanes([...planes, { id: planes.length + 1, ...newPlane }]);
      setShowModal(false);
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  };

  const handleSaveLater = () => {
    setShowModal(false);
    alert("Les informations ont été enregistrées pour une utilisation ultérieure.");
  };

  const handleEditClick = (plane) => {
    setEditPlane(plane);
    setShowModal(true); // Ensure modal is displayed
  };

  const handleUpdate = () => {
    if (
      editPlane.immat &&
      editPlane.type &&
      editPlane.year &&
      editPlane.group &&
      editPlane.htc &&
      editPlane.base &&
      editPlane.oaci &&
      editPlane.places &&
      editPlane.billing &&
      editPlane.block &&
      editPlane.soloPrice &&
      editPlane.dualPrice
    ) {
      // Ensure prices are formatted correctly
      editPlane.soloPrice = editPlane.soloPrice.replace(/[^0-9,]/g, "") + " €";
      editPlane.dualPrice = editPlane.dualPrice.replace(/[^0-9,]/g, "") + " €";

      setPlanes(
        planes.map((plane) =>
          plane.id === editPlane.id ? { ...editPlane } : plane
        )
      );
      setShowModal(false); // Close modal after updating
      setEditPlane(null);
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  };

  const handleFlightIntentChange = (planeId, intent) => {
    setFlightIntent({ ...flightIntent, [planeId]: intent });
  };

  const handleVfrOptionChange = (planeId, option) => {
    setVfrOption({ ...vfrOption, [planeId]: option });
  };

  const handleIfrOptionChange = (planeId, option) => {
    setIfrOption({ ...ifrOption, [planeId]: option });
  };

  const handleEngineTypeChange = (planeId, type) => {
    setEngineType({ ...engineType, [planeId]: type });
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setEditPlane(null);
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <Dashboard
      actualState="planes"
      headerOptions={{
        title: "Avions",
      }}
    >
      <div className="w-full flex flex-col ml-[-230px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Rechercher par immat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 text-sm"
            />
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 text-sm"
            >
              <option value="">Tous les groupes</option>
              <option value="C210">C210</option>
              <option value="PA34">PA34</option>
              <option value="C-150">C-150</option>
              <option value="C172RG">C172RG</option>
              <option value="C172-180">C172-180</option>
              <option value="C172">C172</option>
            </select>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sortByGroup}
                onChange={(e) => setSortByGroup(e.target.checked)}
                className="mr-2"
              />
              Trier par groupe
            </label>
          </div>
          <button
            className="bg-blue-500 text-white px-6 py-3 text-lg rounded hover:bg-blue-600"
            onClick={() => {
              setShowModal(true); // Open modal for adding a new plane
              setEditPlane(null); // Ensure no plane is being edited
            }}
          >
            Ajouter
          </button>
        </div>
        <div className="flex-grow relative">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Immat</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Année</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Groupes</th>
                <th className="border border-gray-300 px-4 py-2 text-left">HTC</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Basé</th>
                <th className="border border-gray-300 px-4 py-2 text-left">OACI</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Remarque</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Places</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Facturation</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Bloc</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Heure SOLO</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Heure DC</th>
              </tr>
            </thead>
            <tbody>
              {matchingPlanes.map((plane) => (
                <tr
                  key={plane.id}
                  className={`hover:bg-gray-50 border-b border-gray-300 ${
                    flightIntent[plane.id] === "non" ? "text-gray-400" : ""
                  }`}
                >
                  <td className="relative">
                    <div className="absolute left-[-40px] top-1/2 transform -translate-y-1/2">
                      <button
                        className={`${
                          flightIntent[plane.id] === "non" ? "text-gray-400 hover:text-gray-500" : "text-blue-500 hover:text-blue-700"
                        }`}
                        onClick={() => handleEditClick(plane)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5h2m-2 4h2m-2 4h2m-6 4h12m-6-16h6m-6 4h6m-6 4h6m-6 4h6"
                          />
                        </svg>
                      </button>
                    </div>
                    {plane.immat}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.type}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.year}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.group}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.htc}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.base}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.oaci}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.remark}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.places}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.billing}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.block}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.soloPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.dualPrice}</td>
                  {flightIntent[plane.id] === "non" && (
                    <td className="border border-gray-300 px-4 py-2 text-left">
                      <div className="flex justify-center items-center relative group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h-2v2h2v-2zm0-6h-2v4h2V7z"
                          />
                        </svg>
                        <span className="absolute bottom-full mb-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100">
                          Non réservable
                        </span>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {nonMatchingPlanes.map((plane) => (
                <tr
                  key={plane.id}
                  className="hover:bg-gray-50 border-b border-gray-300 text-gray-400"
                >
                  <td className="relative">
                    <div className="absolute left-[-40px] top-1/2 transform -translate-y-1/2">
                      <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => handleEditClick(plane)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5h2m-2 4h2m-2 4h2m-6 4h12m-6-16h6m-6 4h6m-6 4h6m-6 4h6"
                          />
                        </svg>
                      </button>
                    </div>
                    {plane.immat}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.type}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.year}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.group}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.htc}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.base}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.oaci}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.remark}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.places}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.billing}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.block}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.soloPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">{plane.dualPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              {editPlane ? "Modifier l'avion" : "Ajouter un nouvel avion"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Vol *</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="flightIntent"
                      value="oui"
                      checked={editPlane ? flightIntent[editPlane.id] === "oui" : flightIntent[newPlane.id] === "oui"}
                      onChange={() =>
                        editPlane
                          ? handleFlightIntentChange(editPlane.id, "oui")
                          : handleFlightIntentChange(newPlane.id, "oui")
                      }
                      className="mr-2"
                    />
                    Oui
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="flightIntent"
                      value="non"
                      checked={editPlane ? flightIntent[editPlane.id] === "non" : flightIntent[newPlane.id] === "non"}
                      onChange={() =>
                        editPlane
                          ? handleFlightIntentChange(editPlane.id, "non")
                          : handleFlightIntentChange(newPlane.id, "non")
                      }
                      className="mr-2"
                    />
                    Non
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Immat *</label>
                <input
                  type="text"
                  name="immat"
                  value={editPlane ? editPlane.immat : newPlane.immat}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, immat: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Type *</label>
                <input
                  type="text"
                  name="type"
                  value={editPlane ? editPlane.type : newPlane.type}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, type: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Année *</label>
                <input
                  type="text"
                  name="year"
                  value={editPlane ? editPlane.year : newPlane.year}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, year: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Groupes *</label>
                <input
                  type="text"
                  name="group"
                  value={editPlane ? editPlane.group : newPlane.group}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, group: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">HTC *</label>
                <input
                  type="text"
                  name="htc"
                  value={editPlane ? editPlane.htc : newPlane.htc}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, htc: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Basé *</label>
                <input
                  type="text"
                  name="base"
                  value={editPlane ? editPlane.base : newPlane.base}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, base: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">OACI *</label>
                <input
                  type="text"
                  name="oaci"
                  value={editPlane ? editPlane.oaci : newPlane.oaci}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, oaci: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Remarque</label>
                <input
                  type="text"
                  name="remark"
                  value={editPlane ? editPlane.remark : newPlane.remark}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, remark: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Places *</label>
                <input
                  type="text"
                  name="places"
                  value={editPlane ? editPlane.places : newPlane.places}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, places: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Facturation *</label>
                <input
                  type="text"
                  name="billing"
                  value={editPlane ? editPlane.billing : newPlane.billing}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, billing: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bloc *</label>
                <input
                  type="text"
                  name="block"
                  value={editPlane ? editPlane.block : newPlane.block}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, block: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Heure SOLO *</label>
                <input
                  type="text"
                  name="soloPrice"
                  value={editPlane ? editPlane.soloPrice : newPlane.soloPrice}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, soloPrice: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Heure DC *</label>
                <input
                  type="text"
                  name="dualPrice"
                  value={editPlane ? editPlane.dualPrice : newPlane.dualPrice}
                  onChange={(e) =>
                    editPlane
                      ? setEditPlane({ ...editPlane, dualPrice: e.target.value })
                      : handleInputChange(e)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">VFR de nuit *</label>
                <select
                  value={editPlane ? vfrOption[editPlane.id] : vfrOption[newPlane.id] || ""}
                  onChange={(e) =>
                    editPlane
                      ? handleVfrOptionChange(editPlane.id, e.target.value)
                      : handleVfrOptionChange(newPlane.id, e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Sélectionnez une option</option>
                  <option value="Non VFR de nuit">Non VFR de nuit</option>
                  <option value="VFR de nuit possible">VFR de nuit possible</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">IFR *</label>
                <select
                  value={editPlane ? ifrOption[editPlane.id] : ifrOption[newPlane.id] || ""}
                  onChange={(e) =>
                    editPlane
                      ? handleIfrOptionChange(editPlane.id, e.target.value)
                      : handleIfrOptionChange(newPlane.id, e.target.value)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Sélectionnez une option</option>
                  <option value="Non IFR">Non IFR</option>
                  <option value="IFR possible">IFR possible</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Type de moteur *</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="engineType"
                      value="MONO moteur"
                      checked={editPlane ? engineType[editPlane.id] === "MONO moteur" : engineType[newPlane.id] === "MONO moteur"}
                      onChange={() =>
                        editPlane
                          ? handleEngineTypeChange(editPlane.id, "MONO moteur")
                          : handleEngineTypeChange(newPlane.id, "MONO moteur")
                      }
                      className="mr-2"
                    />
                    MONO moteur
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="engineType"
                      value="MULTI moteur"
                      checked={editPlane ? engineType[editPlane.id] === "MULTI moteur" : engineType[newPlane.id] === "MULTI moteur"}
                      onChange={() =>
                        editPlane
                          ? handleEngineTypeChange(editPlane.id, "MULTI moteur")
                          : handleEngineTypeChange(newPlane.id, "MULTI moteur")
                      }
                      className="mr-2"
                    />
                    MULTI moteur
                  </label>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)} // Close modal
                >
                  Annuler
                </button>
                {editPlane ? (
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleUpdate} // Save updates
                  >
                    Modifier
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSave} // Save new plane
                  >
                    Enregistrer
                  </button>
                )}
                <button
                  type="button"
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={handleSaveLater}
                >
                  Fini plus tard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Dashboard>
  );
}

export default function AuthPlanePage() {
  return <AuthGuard render={PlanePage} />;
}