// components/Popup.tsx
"use client";
import { createPortal } from "react-dom";

export default function Popup(props: { children: React.ReactNode; open: boolean }) {
	return createPortal(
		<div className={`flex justify-center items-center w-dvw h-dvh fixed left-0 top-0 transition ${props.open ? "bg-gray-950/90 z-50 opacity-100" : "bg-gray-950/0 -z-50 opacity-0 pointer-events-none"}`}>
			<div className="flex flex-col justify-center items-center">{props.children}</div>
		</div>,
		document.body,
	);
}
