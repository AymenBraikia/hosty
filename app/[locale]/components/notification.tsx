export default function Notification(props: { err: string; notification_visible: boolean }) {
	return (
		<div className={`bg-red-800/20 text-red-400 p-4 max-w-96 transition-all duration-150 ease-in-out fixed ${props.notification_visible ? "right-8 translate-x-0" : "right-0 translate-x-full "} bottom-8 min-w-32 min-h-8 z-50`}>
			{props.err}
			<div className={`absolute bottom-0 left-0 ${props.notification_visible ? "w-full [transition:all_8s_0s_linear]" : "w-0"} h-[3px] bg-red-400 `}></div>
		</div>
	);
}
