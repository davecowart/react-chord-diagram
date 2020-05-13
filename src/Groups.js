import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { rgb } from 'd3-color';

const getAngle = (group) => ((group.startAngle + group.endAngle) / 2);

const Groups = ({
    componentId,
    chords,
    color,
    arc,
    outerRadius,
    setMouseOverGroup,
    groupLabels,
    labelColors,
    disableHover,
    hoverPersist,
    setHoverPersist,
    onClick,
}) => (
    <g className="groups">
        {chords.groups.map((group, groupIndex) => (
            <g
                key={groupIndex}
                onMouseOver={(!disableHover && !hoverPersist) ? () => setMouseOverGroup(group.index) : null}
                onMouseOut={(!disableHover && !hoverPersist) ? () => setMouseOverGroup(null) : null}
                onClick={ () => { setHoverPersist(!hoverPersist); onClick(group.index) } }
            >
                <path
                    id={`component${componentId}-group${groupIndex}`}
                    fill={`${color(groupIndex)}`}
                    stroke={`${rgb(color(groupIndex)).darker()}`} d={arc(group)}
                />

                <text
                    transform={`rotate(${getAngle(group) * 180 / Math.PI - 90 }) translate(${outerRadius + ((getAngle(group) < Math.PI / 2 || getAngle(group) > Math.PI * 1.5) ? 10 : 20)}) ${(getAngle(group) < Math.PI / 2 || getAngle(group) > Math.PI * 1.5) ? "rotate(90)" : "rotate(270)"}`}
                    fill={labelColors.length === 1 ? labelColors[0] : labelColors[groupIndex]}
                    style={{textAnchor: "middle"}}
                >
                    {groupLabels[groupIndex]}
                </text>
            </g>
        ))}
    </g>
);

Groups.propTypes = {
    componentId: PropTypes.number.isRequired,
    chords: PropTypes.array.isRequired,
    color: PropTypes.func.isRequired,
    arc: PropTypes.func.isRequired,
    setMouseOverGroup: PropTypes.func.isRequired,
    groupLabels: PropTypes.array,
    labelColors: PropTypes.array,
    disableHover: PropTypes.bool,
    persistHoverOnClick: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Groups;
