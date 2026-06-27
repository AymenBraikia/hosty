{
    /* <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve"> */
}

import { svg_props } from "@/app/[locale]/types/svg_icon";

export default function Dashboard(props: svg_props) {
    return (
        <svg className={props.css} width={`${props.s || props.w}px` || "50px"} height={`${props.s || props.h}px` || "50px"} stroke="none" fill={props.color || "currentColor"} viewBox="0 0 24 24">
            <path
                d="M5,3C4.5,3,3.9,3.2,3.6,3.6S3,4.5,3,5v14c0,0.5,0.2,1.1,0.6,1.4S4.5,21,5,21h14c0.5,0,1.1-0.2,1.4-0.6S21,19.5,21,19V5
	c0-0.5-0.2-1.1-0.6-1.4S19.5,3,19,3H5z M5,5h14v14H5V5z M8,7C7.4,7,7,7.4,7,8v2c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1V8
	c0-0.6-0.4-1-1-1H8z M14,7c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1V8c0-0.6-0.4-1-1-1H14z M8,13c-0.6,0-1,0.4-1,1v2
	c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1v-2c0-0.6-0.4-1-1-1H8z M14,13c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1v-2
	c0-0.6-0.4-1-1-1H14z"
            />
            <rect fill="none" width={props.s} height={props.s} />
        </svg>
    );
}
