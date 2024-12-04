import Svg, {
    G,
    Rect,
    Path,
    Defs,
    LinearGradient,
    Stop,
    RadialGradient,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const LogoStore = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={95}
        height={89}
        fill="none"
        {...props}
    >
        <G filter="url(#a)">
            <Rect
                width={93}
                height={87}
                x={1}
                y={1}
                fill="url(#b)"
                fillOpacity={0.2}
                rx={38}
            />
            <Rect
                width={93}
                height={87}
                x={1}
                y={1}
                stroke="url(#c)"
                strokeWidth={2}
                rx={38}
            />
        </G>
        <Path
            fill="url(#d)"
            d="M46.517 42.966c-4.994-4.63-7.49-6.946-7.49-9.823 0-2.877 2.496-5.193 7.49-9.823l.403-.374C51.914 18.316 54.41 16 57.513 16c3.103 0 5.6 2.315 10.593 6.946l.404.374c4.993 4.63 7.49 6.946 7.49 9.823 0 2.877-2.497 5.192-7.49 9.823l-.404.374c-4.993 4.63-7.49 6.946-10.593 6.946-3.102 0-5.6-2.316-10.593-6.946l-.403-.374Z"
        />
        <G clipRule="evenodd" filter="url(#e)">
            <Path
                fill="#C72752"
                fillOpacity={0.35}
                fillRule="evenodd"
                d="M32.447 31.036c-6.556 4.53-9.834 6.794-11.122 10.14-.103.268-.196.54-.278.815-1.026 3.426.226 7.09 2.73 14.419 2.504 7.328 3.756 10.993 6.704 13.19.236.177.48.345.73.504 3.108 1.987 7.16 1.987 15.264 1.987 8.103 0 12.155 0 15.264-1.987.25-.159.493-.327.73-.503 2.947-2.198 4.2-5.863 6.704-13.191 2.504-7.33 3.756-10.993 2.73-14.42a11.26 11.26 0 0 0-.279-.814c-1.287-3.346-4.565-5.61-11.121-10.14-6.556-4.529-9.834-6.794-13.578-6.924-.3-.01-.6-.01-.9 0-3.744.13-7.022 2.395-13.578 6.924Z"
            />
            <Path
                stroke="url(#f)"
                strokeLinecap="round"
                d="M32.447 31.036c-6.556 4.53-9.834 6.794-11.122 10.14-.103.268-.196.54-.278.815-1.026 3.426.226 7.09 2.73 14.419 2.504 7.328 3.756 10.993 6.704 13.19.236.177.48.345.73.504 3.108 1.987 7.16 1.987 15.264 1.987 8.103 0 12.155 0 15.264-1.987.25-.159.493-.327.73-.503 2.947-2.198 4.2-5.863 6.704-13.191 2.504-7.33 3.756-10.993 2.73-14.42a11.26 11.26 0 0 0-.279-.814c-1.287-3.346-4.565-5.61-11.121-10.14-6.556-4.529-9.834-6.794-13.578-6.924-.3-.01-.6-.01-.9 0-3.744.13-7.022 2.395-13.578 6.924Z"
            />
        </G>
        <Path
            fill="url(#g)"
            d="M54.464 71.963v-8.54c0-4.196-3.577-7.598-7.99-7.598-4.412 0-7.989 3.402-7.989 7.598v8.54c2.146.128 4.743.128 7.99.128s5.843 0 7.99-.128Z"
        />
        <Defs>
            <LinearGradient
                id="c"
                x1={47.5}
                x2={47.5}
                y1={1}
                y2={88}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#fff" />
                <Stop offset={1} stopColor="#fff" stopOpacity={0} />
            </LinearGradient>
            <LinearGradient
                id="d"
                x1={39.027}
                x2={74.058}
                y1={50.286}
                y2={14.119}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#942050" />
                <Stop offset={1} stopColor="#FF2E54" />
            </LinearGradient>
            <LinearGradient
                id="f"
                x1={20.688}
                x2={68.578}
                y1={24.104}
                y2={75.522}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#fff" stopOpacity={0.25} />
                <Stop offset={1} stopColor="#fff" stopOpacity={0} />
            </LinearGradient>
            <LinearGradient
                id="g"
                x1={46.609}
                x2={69.047}
                y1={75.556}
                y2={53.949}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#fff" />
                <Stop offset={1} stopColor="#fff" stopOpacity={0.2} />
            </LinearGradient>
            <RadialGradient
                id="b"
                cx={0}
                cy={0}
                r={1}
                gradientTransform="matrix(93.00014 86.99998 -86.80665 92.79347 1 1)"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FAFAFA" />
                <Stop offset={1} stopColor="#F7F7F7" stopOpacity={0} />
            </RadialGradient>
        </Defs>
    </Svg>
)
export default LogoStore
