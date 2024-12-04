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
const Client = (props) => (
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
            d="M50.509 51.82C44.836 46.012 42 43.108 42 39.5c0-3.608 2.836-6.512 8.509-12.32l.458-.469C56.639 20.904 59.475 18 63 18c3.525 0 6.36 2.904 12.033 8.711l.458.47C81.164 32.987 84 35.89 84 39.5c0 3.608-2.836 6.512-8.509 12.32l-.458.469C69.361 58.096 66.525 61 63 61c-3.525 0-6.36-2.904-12.033-8.711l-.458-.47Z"
        />
        <G filter="url(#e)">
            <Path
                fill="#2EFFD9"
                fillOpacity={0.35}
                d="M38.448 16.95c-7.324 0-13.26 5.848-13.26 13.063 0 7.214 5.936 13.062 13.26 13.062 7.323 0 13.26-5.848 13.26-13.063 0-7.214-5.937-13.062-13.26-13.062ZM30.073 47.2c-7.324 0-13.26 5.848-13.26 13.063 0 7.214 5.936 13.062 13.26 13.062h16.75c7.323 0 13.26-5.848 13.26-13.063 0-7.214-5.937-13.062-13.26-13.062h-16.75Z"
            />
            <Path
                stroke="url(#f)"
                strokeLinecap="round"
                d="M38.448 16.45c-7.593 0-13.76 6.065-13.76 13.563 0 7.497 6.167 13.562 13.76 13.562 7.592 0 13.76-6.065 13.76-13.563 0-7.497-6.168-13.562-13.76-13.562ZM30.073 46.7c-7.593 0-13.76 6.065-13.76 13.563 0 7.497 6.167 13.562 13.76 13.562h16.75c7.592 0 13.76-6.065 13.76-13.563 0-7.497-6.168-13.562-13.76-13.562h-16.75Z"
            />
        </G>
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
                x1={42}
                x2={85.859}
                y1={61}
                y2={19.988}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#209471" />
                <Stop offset={1} stopColor="#2EFFD9" />
            </LinearGradient>
            <LinearGradient
                id="f"
                x1={16.812}
                x2={71.284}
                y1={16.95}
                y2={58.717}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#fff" stopOpacity={0.25} />
                <Stop offset={1} stopColor="#fff" stopOpacity={0} />
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
export default Client
