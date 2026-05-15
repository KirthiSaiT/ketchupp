"use client";

import React, { useState, useEffect } from "react";
import { getStoreSettings, updateStoreSettings } from "@/lib/actions/settings.action";
import { toast } from "sonner";
import { Loader2, Save, Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    showUpcoming: false,
    upcomingTitle: "THE MIDNIGHT SYNDICATE",
    upcomingDescription: "Our most experimental collection yet.",
    upcomingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  useEffect(() => {
    getStoreSettings().then((data) => {
      if (data) {
        setSettings({
          showUpcoming: data.showUpcoming || false,
          upcomingTitle: data.upcomingTitle || "THE MIDNIGHT SYNDICATE",
          upcomingDescription: data.upcomingDescription || "Our most experimental collection yet.",
          upcomingDate: data.upcomingDate ? new Date(data.upcomingDate).toISOString().split("T")[0] : "",
        });
      }
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...settings,
      upcomingDate: new Date(settings.upcomingDate),
    };
    
    const res = await updateStoreSettings(payload);
    if (res.success) {
      toast.success("Settings updated successfully!");
    } else {
      toast.error("Failed to update settings.");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-red" /></div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-brand-red" />
        <h1 className="text-3xl font-black text-[#1A1A1A] tracking-tight">Store Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Upcoming Section Panel */}
        <div className="bg-white rounded-3xl p-8 border border-[#DDD8CE] shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#DDD8CE]">
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">"Upcoming" Homepage Section</h2>
              <p className="text-sm text-[#8B8580] mt-1">Control the visibility and content of the dropping soon section.</p>
            </div>
            <label className="flex items-center cursor-pointer relative">
              <input 
                type="checkbox" 
                name="showUpcoming" 
                checked={settings.showUpcoming} 
                onChange={handleChange} 
                className="sr-only peer" 
              />
              <div className="w-14 h-7 bg-[#DDD8CE] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-red"></div>
            </label>
          </div>

          <div className={`space-y-6 transition-opacity ${settings.showUpcoming ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-2 block">Section Title</label>
              <input 
                type="text" 
                name="upcomingTitle" 
                value={settings.upcomingTitle} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-brand-red transition-colors font-medium text-[#1A1A1A]" 
              />
            </div>
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-2 block">Description</label>
              <textarea 
                rows={3} 
                name="upcomingDescription" 
                value={settings.upcomingDescription} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-brand-red transition-colors font-medium text-[#1A1A1A]" 
              />
            </div>
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8B8580] mb-2 block">Drop Date (Countdown Target)</label>
              <input 
                type="date" 
                name="upcomingDate" 
                value={settings.upcomingDate} 
                onChange={handleChange} 
                className="w-full sm:w-1/2 px-4 py-3 bg-[#FAF7F2] rounded-xl border border-[#DDD8CE] text-sm focus:outline-none focus:border-brand-red transition-colors font-medium text-[#1A1A1A]" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-2 bg-brand-red hover:bg-[#a01019] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
