import * as React from "react"
import Svg, { Ellipse, Path } from "react-native-svg"
const Market = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={94}
        height={139}
        fill="none"
        {...props}
    >
        <Ellipse
            cx={46.102}
            cy={113.065}
            fill="#252B5C"
            opacity={0.15}
            rx={42.442}
            ry={24.781}
            transform="rotate(.927 46.102 113.065)"
        />
        <Ellipse
            cx={46.102}
            cy={113.065}
            fill="#F95959"
            opacity={0.5}
            rx={19.589}
            ry={11.564}
            transform="rotate(.927 46.102 113.065)"
        />
        <Path
            fill="#BB4343"
            d="M92.872 47.73c-.33 20.348-29.847 51.834-41.841 63.801-2.76 2.753-7.136 2.682-9.806-.159-11.6-12.348-40.084-44.773-39.755-65.12.198-12.267 5.204-23.953 13.915-32.489C24.095 5.228 35.799.543 47.919.74 60.04.936 71.585 5.997 80.017 14.81c8.43 8.813 13.055 20.655 12.856 32.922Z"
        />
        <Path
            fill="#fff"
            d="M46.571 84.077a37.641 37.641 0 1 0 1.218-75.273 37.641 37.641 0 0 0-1.218 75.273Z"
            opacity={0.25}
        />
    </Svg>
)
export default Market
