"use client";
import { useState, useEffect } from "react";
import {
  searchDrugs,
  createSaveddrug,
  deleteSaveddrug,
  logoutUser,
  deleteAccount,
  updateSaveddrugNotes,
  getSaveddrugs
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const FILTER_CATEGORIES = [
    { key: "artificial_colors", label: "Artificial Colors" },
    { key: "artificial_sweeteners", label: "Artificial Sweeteners" },
    { key: "artificial_flavors", label: "Artificial Flavors" },
    { key: "preservatives", label: "Preservatives" },
    { key: "gluten", label: "Gluten" },
    { key: "added_sugar", label: "Added Sugar" },
    { key: "vegan", label: "Animal Ingredients" },
    { key: "possible_endocrine_disruptors", label: "Endocrine Disruptors" },
    { key: "sugar_alcohols", label: "Sugar Alcohols" },
    { key: "potentially_harmful_additives", label: "Other Potentially Harmful Additives" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
      fetchDrugs();
    } else {
      console.warn("⚠️ No auth token found, skipping API calls.");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleThemeChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  const fetchDrugs = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.warn("⚠️ Skipping fetchDrugs: No auth token found.");
      return;
    }

    try {
      const savedDrugs = await getSaveddrugs();
      console.log("📥 API Response from /saved_drugs:", savedDrugs);

      if (!savedDrugs || !Array.isArray(savedDrugs.data)) {
        console.warn("⚠️ No saved drugs found or response format incorrect.");
        return;
      }

      const formattedDrugs = savedDrugs.data.map((r) => ({
        id: r.id,
        notes: r.attributes?.notes || "",
        ...r.attributes
      }));

      setDrugs(formattedDrugs);
    } catch (error) {
      console.error("❌ Error fetching saved drugs:", error.message);
    }
  };
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!drugName.trim()) return;

    setHasSearched(true);
    setError("");
    setLoading(true);
    setSelectedDrug(null);
    setExpandedSearchId(null);

    const filterParams = selectedFilters
      .map((f) => `filters[]=${encodeURIComponent(f)}`)
      .join("&");

    const { data, error } = await searchDrugs(drugName, filterParams);

    if (error) {
      setError(error); // this could now be your rate limit message
      setLoading(false);
      return;
    }

    setSearchResults(data.data.map((item) => ({ id: item.id, ...item.attributes })));
    setResultStats(data.meta);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        alert("❌ Error: Could not retrieve user ID");
        return;
      }

      try {
        await deleteAccount(userId);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_id");
        alert("Account deleted successfully!");
        window.location.href = "/signup";
      } catch (err) {
        alert("Failed to delete account. Please try again.");
      }
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
    try {
      await updateSaveddrugNotes(id, notes);

      setDrugs((prev) =>
        prev.map((d) => (d.id === id ? { ...d, notes } : d))
      );

      console.log(`✅ Updated notes for drug ${id} in frontend state:`, notes);
    } catch (error) {
      console.error("❌ Failed to update notes:", error);
    }
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
    handleUpdateNotes,
    hasSearched
  };
}
