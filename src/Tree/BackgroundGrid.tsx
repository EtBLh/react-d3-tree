import React, { ReactElement } from "react"

export type BackgroundGrid = {
    type: "dot" | "line" | "custom",
    thickness?: number,
    color?: string,
    gridCellSize?: {width: number, height: number},
    gridCellFunc?: () => ReactElement
}

interface BackgroundGridProps extends BackgroundGrid{
    patternInstanceRef: string
}

export const getDefaultBackgroundGridParam = (param: BackgroundGrid | BackgroundGridProps) => {
    if (param === undefined) return undefined;
    const {
        thickness = 2,
        color = "#bbb",
        gridCellSize = { width: 24, height: 24 },
    } = param;

    return {
        thickness,
        color,
        gridCellSize,
        ...param
    }
}

const BackgroundGrid = (props: BackgroundGridProps) => {

    const {
        type,
        thickness,
        color,
        gridCellSize,
        gridCellFunc
    } = getDefaultBackgroundGridParam(props);

    return <>
        <pattern
        id="bgPattern"
        className={`rd3t-pattern ${props.patternInstanceRef}`}
        patternUnits="userSpaceOnUse"
        width={gridCellSize.width}
        height={gridCellSize.height}
        >
            {
                type === "dot"
                    ? <rect
                        width={thickness}
                        height={thickness}
                        rx={thickness}
                        fill={color}
                    />
                    : null
            }
            {
                type === "line"
                    ? <>
                        <line strokeWidth={thickness} stroke={color} x1="0" y1="0" x2={gridCellSize.width} y2="0" opacity="1"/>
                        <line strokeWidth={thickness} stroke={color} x1="0" y1="0" x2="0" y2={gridCellSize.height} opacity="1"/>
                    </>
                    : null
            }
            {
                type === "custom"
                    ? gridCellFunc?.()
                    : null
            }
        </pattern>
        <rect fill="url(#bgPattern)" width="100%" height="100%" id='bgPatternContainer'/>
    </>
}

export default BackgroundGrid;