"use client";
import React, { useState } from "react";
import type { Locale } from "@/lib/i18n-config";

interface DonateProps {
    lang: Locale;
}

export default function Donate({ lang: _lang }: DonateProps) {
    const [donationType, setDonationType] = useState("fund");
    const [contact, setContact] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <section className="w-full relative">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="relative md:-mt-20">
                    <div className="rounded-2xl bg-red-200 p-6 sm:p-8 shadow-md">
                        <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-primary">Quick Donate</h2>

                        <form className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
                            <div className="md:col-span-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Donation Type <span className="text-red-600">*</span></label>
                                <select
                                    value={donationType}
                                    onChange={(e) => setDonationType(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                                >
                                    <option value="fund">Donation Fund</option>
                                    <option value="project">Project Support</option>
                                    <option value="general">General Donation</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Mobile/Email <span className="text-red-600">*</span></label>
                                <input
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder="Type Mobile/Email"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                                />
                            </div>

                            <div className="md:col-span-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Donation Amount <span className="text-red-600">*</span></label>
                                <input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Write in Number"
                                    inputMode="numeric"
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                                />
                            </div>

                            <div className="md:col-span-1 flex items-end">
                                <button
                                    type="button"
                                    className="w-full rounded-lg bg-emerald-700 px-6 py-3 text-white shadow hover:brightness-95 md:w-auto"
                                    onClick={() => {
                                        if (!contact || !amount) {
                                            alert("Please provide contact and amount.");
                                            return;
                                        }
                                        alert(`Donating ${amount} (${donationType}) — contact: ${contact}`);
                                    }}
                                >
                                    Donate
                                </button>
                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-800">
                            You will receive tax relief when you donate to Minha Foundation Foundation. <a className="font-medium text-emerald-700" href="#">Click here to learn more.</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
