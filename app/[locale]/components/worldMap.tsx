"use client";
import { DarkWorldMap } from "@/lib/world_map";
import { useEffect, useRef } from "react";

export default function World_map() {
	const hasInitialized = useRef(false);

    useEffect(() => {
		if (!hasInitialized.current) {
			new DarkWorldMap("worldMap");
			hasInitialized.current = true;
		}
	}, []);
    return <canvas className="w-full h-full rounded-2xl" id="worldMap"></canvas>
}