import React, { ReactElement, useCallback, useState } from "react";
import Avatar from "../../Avatar";

import "./AvatarGroup.scss";

export type AvatarGroupProps = {
  children: ReactElement | ReactElement[] | [];
  showHideBadgeClass?: string;
  showMoreBadgeClass?: string;
  showLessBadgeClass?: string;
  max?: number;
  collapseBorder?: number;
  collapseColor?: string;
  collapse?: number;
  className?: string;
};
export default function AvatarGroup({
  showHideBadgeClass = "",
  showMoreBadgeClass = "",
  showLessBadgeClass = "",
  collapseColor = "#FFF",
  max = Number.MAX_VALUE,
  collapseBorder = 2,
  className = "",
  collapse = -8,
  children,
}: AvatarGroupProps) {
  const [showMore, setShowMore] = useState(false);
  const [maxBadge, setMaxBadge] = useState(max);

  const cloneChildren = React.Children.map(children, (child, i) => {
    if (i < maxBadge) {
      const cloneChild = React.cloneElement(child, {
        collapse: i == 0 ? 0 : collapse,
        collapseBorder,
        collapseColor,
        zIndex: 99999 - i,
        key: i,
      });
      return cloneChild;
    }
  });

  const ShowHideMoreHendle = useCallback(() => {
    !showMore ? setMaxBadge(Number.MAX_VALUE) : setMaxBadge(max);
    setShowMore((prev) => !prev);
  }, [showMore]);

  if (max != Number.MAX_VALUE) {
    // @ts-ignore:next-line
    const totalLengt = children.length;
    const totalRest = totalLengt - max;
    const badgeSize =
      cloneChildren[0].props.size ||
      cloneChildren[0].props.children.props?.size ||
      "sm";

    cloneChildren.push(
      <Avatar
        collapse={collapse}
        collapseBorder={collapseBorder}
        collapseColor={collapseColor}
        size={badgeSize}
        zIndex={0}
        color="#fff"
        key="SMKEY"
        onClick={ShowHideMoreHendle}
        className={`ACAvatar__show-less ${showHideBadgeClass} ${
          showMore ? showMoreBadgeClass : showLessBadgeClass
        }`}
      >
        <>{!showMore ? `+${totalRest}` : `-${totalRest}`}</>
      </Avatar>
    );
  }

  return (
    <div
      data-testid="avatar__group-root"
      className={"ACAvatar__group " + className}
    >
      {cloneChildren}
    </div>
  );
}
