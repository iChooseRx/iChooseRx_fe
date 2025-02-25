"use client";
import { useState, useEffect } from "react";
import {
  searchDrugs,
  createSaveddrug,
  deleteSaveddrug,
  logoutUser,
  deleteAccount,
  updateSaveddrugNotes
} from "@/services/api";

export function useDashboard() {
  const [drugs, setDrugs] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [expandedSearchId, setExpandedSearchId] = useState(null);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [resultStats, setResultStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [notesByDrug, setNotesByDrug] = useState({});

  const FILTER_CATEGORIES = [
    { key: "artificial_colors", label: "No Artificial Colors" },
    { key: "artificial_sweeteners", label: "No Artificial Sweeteners" },
    { key: "artificial_flavors", label: "No Artificial Flavors" },
    { key: "preservatives", label: "No Preservatives" },
    { key: "gluten", label: "No Gluten" },
    { key: "added_sugar", label: "No Added Sugar" },
    { key: "vegan", label: "No Animal Ingredients" },
    { key: "possible_endocrine_disruptors", label: "No Endocrine Disruptors" }
  ];

  useEffect(() => {
    fetchDrugs();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleThemeChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  async function fetchDrugs() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ICHOOSERX_BE_BASE_URL}/saved_drugs`, { credentials: "include" });
      if (res.status === 401) {
        alert("You are not logged in!");
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setDrugs(data.data.map((r) => ({ id: r.id, ...r.attributes })));
    } catch (error) {
      console.error("Error fetching drugs:", error);
    }
  }

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!drugName.trim()) return;

    setError("");
    setLoading(true);
    setSelectedDrug(null);
    setExpandedSearchId(null);

    try {
      const filterParams = selectedFilters.map((f) => `filters[]=${encodeURIComponent(f)}`).join("&");
      const { data, meta } = await searchDrugs(drugName, filterParams);
      setSearchResults(data.map((item) => ({ id: item.id, ...item.attributes })));
      setResultStats(meta);
    } catch (err) {
      setError("Failed to fetch drug data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      await deleteAccount(1);
      alert("Account deleted successfully!");
      window.location.href = "/";
    }
  };

  const handleSaveDrug = async (drugData) => {
    await createSaveddrug(drugData);
    alert("Drug saved successfully!");
    await fetchDrugs();
  };

  const handleDeleteDrug = async (id) => {
    await deleteSaveddrug(id);
    alert("Drug deleted successfully!");
    setDrugs((prev) => prev.filter((drug) => drug.id !== id));
  };

  const handleUpdateNotes = async (id, notes) => {
    await updateSaveddrugNotes(id, notes);
    await fetchDrugs();
  };

  return {
    drugs,
    drugName,
    setDrugName,
    searchResults,
    expandedSearchId,
    setExpandedSearchId,
    selectedDrug,
    setSelectedDrug,
    resultStats,
    error,
    loading,
    isDarkMode,
    selectedFilters,
    setSelectedFilters,
    notesByDrug,
    setNotesByDrug,
    FILTER_CATEGORIES,
    fetchDrugs,
    handleSearch,
    handleLogout,
    handleDeleteAccount,
    handleSaveDrug,
    handleDeleteDrug,
    handleUpdateNotes
  };
}
