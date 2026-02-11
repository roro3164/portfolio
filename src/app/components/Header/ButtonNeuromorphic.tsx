"use client";

import React from "react";
import { CommonButtonProps } from "@/lib/types/button-props";
import { useButtonProps } from "@/lib/hooks/useButtonProps";

export interface ButtonNeuromorphicProps
  extends CommonButtonProps,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "style" | "children"
    > {}

export function ButtonNeuromorphic({
  text,
  children,
  linkUrl,
  openInNewTab = true,
  onClick,
  className,
  style,
  disabled,
  loading,
  ...props
}: ButtonNeuromorphicProps) {
  const finalProps = useButtonProps(props);

  const {
    backgroundColor: _backgroundColor,
    textColor: _textColor,
    borderRadius: _borderRadius,
    fontFamily: _fontFamily,
    fontSize: _fontSize,
    fontWeight: _fontWeight,
    componentName: _componentName,
    textConfig: _textConfig,
    size: _size,
    sizeLevel: _sizeLevel,
    padding: _padding,
    margin: _margin,
    align: _align,
    alignResponsive: _alignResponsive,
    icon: _icon,
    iconPosition: _iconPosition,
    iconSize: _iconSize,
    width: _width,
    height: _height,
    opacity: _opacity,
    shadow: _shadow,
    hover: _hover,
    borderColor: _borderColor,
    borderWidth: _borderWidth,
    borderStyle: _borderStyle,
    customFontFamily: _customFontFamily,
    blurAmount: _blurAmount,
    opacityLevel: _opacityLevel,
    ...domProps
  } = props as any;

  const paddingMap = {
    sm: { v: 10, h: 20 },
    md: { v: 12, h: 24 },
    lg: { v: 16, h: 36 },
  } as const;

  const padding = paddingMap[finalProps.size] || paddingMap.md;
  const finalPadV = padding.v;
  const finalPadH = padding.h;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (linkUrl) {
      window.open(linkUrl, openInNewTab ? "_blank" : "_self");
    }
    if (onClick) {
      onClick(e);
    }
  };

  const buttonStyle = {
    "--main-color": finalProps.backgroundColor,
    "--text-color": finalProps.textColor,
    "--border-radius": `${finalProps.borderRadius}px`,
    "--font-family": finalProps.fontFamily,
    "--font-size": `${finalProps.fontSize}px`,
    "--font-weight": finalProps.fontWeight,
    "--padding": `${finalPadV}px ${finalPadH}px`,
  } as React.CSSProperties;

  const displayText = text || children || "BUTTON";

  const hasMinWidth = style?.minWidth ? true : false;
  const hasFlex = style?.flex !== undefined;
  const classNameRequestsFullWidth =
    typeof className === "string" &&
    /(^|\s)(w-full|flex-1)(\s|$)/.test(className);
  const shouldUseFullWidth =
    hasMinWidth || hasFlex || classNameRequestsFullWidth;

  const wrapperStyle = {
    ...buttonStyle,
    display: "flex",
    flexShrink: 0,
    ...((style && typeof style === "object" && !Array.isArray(style))
      ? style
      : {}),
    ...(shouldUseFullWidth ? { width: "100%" } : {}),
  };

  const showIcon = props.icon !== "none";

  return (
    <div style={wrapperStyle} className={className || ""}>
      <style jsx>{`
        .dyn-button {
          all: unset;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          position: relative;
          border-radius: var(--border-radius);
          border: 2px solid rgba(255, 255, 255, 0.6);
          width: ${shouldUseFullWidth ? "100%" : "auto"};
          white-space: nowrap;
          background:
            radial-gradient(
              ellipse at top left,
              rgba(255, 255, 255, 0.3),
              transparent 50%
            ),
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--main-color) 75%, white),
              var(--main-color) 35%,
              color-mix(in srgb, var(--main-color) 80%, black) 65%,
              color-mix(in srgb, var(--main-color) 60%, black) 100%
            );
          box-shadow:
            0 0.6em 1.2em -0.3em rgba(0, 0, 0, 0.15),
            0 0.2em 0.4em -0.1em rgba(0, 0, 0, 0.1),
            -0.15em -0.15em 0.3em -0.05em rgba(255, 255, 255, 0.2),
            0.08em 0.08em 0.2em -0.03em rgba(0, 0, 0, 0.08);
          transition:
            transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dyn-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 14px 3px
              color-mix(in srgb, var(--main-color) 38%, transparent),
            0 0.45em 0.9em -0.3em rgba(0, 0, 0, 0.18),
            0 0.16em 0.32em -0.12em rgba(0, 0, 0, 0.12),
            -0.12em -0.12em 0.26em -0.06em rgba(255, 255, 255, 0.22);
        }

        .dyn-button .dyn-button-inner {
          position: relative;
          overflow: hidden;
        }

        .dyn-button .dyn-button-inner::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(255, 255, 255, 0.12) 40%,
            rgba(255, 255, 255, 0.65) 50%,
            rgba(255, 255, 255, 0.12) 60%,
            transparent 75%
          );
          transform: translateX(-120%) rotate(45deg);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .dyn-button:hover .dyn-button-inner::before {
          opacity: 1;
          animation: shine-vitre 1.2s ease-in-out infinite;
        }

        @keyframes shine-vitre {
          0% {
            transform: translateX(-120%) rotate(45deg);
          }
          100% {
            transform: translateX(120%) rotate(45deg);
          }
        }

        .dyn-button .dyn-button-inner {
          padding: var(--padding);
          border-radius: inherit;
          clip-path: inset(0 0 0 0 round var(--border-radius));
          width: ${shouldUseFullWidth ? "100%" : "auto"};
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background:
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--main-color) 70%, white) 0%,
              color-mix(in srgb, var(--main-color) 85%, white) 20%,
              var(--main-color) 50%,
              color-mix(in srgb, var(--main-color) 85%, black) 80%,
              color-mix(in srgb, var(--main-color) 70%, black) 100%
            ),
            radial-gradient(
              ellipse at top left,
              rgba(255, 255, 255, 0.15),
              transparent 60%
            );
          box-shadow:
            inset 0.1em 0.12em 0.2em -0.03em rgba(0, 0, 0, 0.15),
            inset -0.05em -0.06em 0.12em -0.01em rgba(0, 0, 0, 0.1),
            inset 0 0 0.06em 0.01em rgba(0, 0, 0, 0.08),
            inset 0 0.06em 0.12em 0.06em rgba(255, 255, 255, 0.3),
            inset 0.03em 0.05em 0.1em -0.01em rgba(255, 255, 255, 0.6),
            inset 0.12em 0.12em 0.2em -0.06em rgba(255, 255, 255, 0.2),
            inset -0.06em -0.18em 0.25em 0.03em rgba(0, 0, 0, 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.3);
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dyn-button:hover .dyn-button-inner {
          background:
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--main-color) 60%, white) 0%,
              color-mix(in srgb, var(--main-color) 80%, white) 20%,
              color-mix(in srgb, var(--main-color) 95%, white) 50%,
              var(--main-color) 80%,
              color-mix(in srgb, var(--main-color) 85%, black) 100%
            );
          box-shadow:
            inset 0 0 0.6em 0.1em rgba(0, 0, 0, 0.25),
            inset 0.3em 0 0.5em 0 rgba(0, 0, 0, 0.2),
            inset -0.3em 0 0.5em 0 rgba(0, 0, 0, 0.2),
            inset 0 0.3em 0.5em 0 rgba(0, 0, 0, 0.2),
            inset 0 -0.3em 0.5em 0 rgba(0, 0, 0, 0.2),
            inset 0.2em 0.2em 0.4em 0 rgba(0, 0, 0, 0.15),
            inset -0.2em 0.2em 0.4em 0 rgba(0, 0, 0, 0.15),
            inset 0.2em -0.2em 0.4em 0 rgba(0, 0, 0, 0.15),
            inset -0.2em -0.2em 0.4em 0 rgba(0, 0, 0, 0.15),
            inset 0 0 0.15em 0.1em rgba(255, 255, 255, 0.08),
            inset 0 0 0 1px rgba(255, 255, 255, 0.15);
        }

        .dyn-button:active .dyn-button-inner {
          transform: scale(0.97);
          transition: transform 120ms;
          box-shadow: inset 0 0 0.8em 0.15em rgba(0, 0, 0, 0.35);
        }

        .dyn-button span {
          position: relative;
          z-index: 4;
          font-family: var(--font-family), sans-serif;
          letter-spacing: 0.05em;
          font-weight: var(--font-weight);
          font-size: var(--font-size);
          color: var(--text-color);
          transition: transform 300ms, text-shadow 300ms ease;
          display: block;
          text-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.4);
          user-select: none;
        }

        .dyn-button:hover span {
          transform: scale(0.98);
        }

        .dyn-button-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          filter: brightness(0) invert(1);
          transform-origin: center;
          animation: float 3s ease-in-out infinite;
        }

        .dyn-button:hover .dyn-button-icon {
          animation: wiggle 0.5s ease-in-out infinite;
        }

        @keyframes wiggle {
          0% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(-5deg);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-1px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>

      <button
        className="dyn-button"
        onClick={handleClick}
        disabled={disabled || loading}
        {...domProps}
      >
        <div className="dyn-button-inner">
          <span>{displayText}</span>
          {showIcon && (
            <img
              src="/image/icons/gift.svg"
              alt="Cadeau"
              className="dyn-button-icon"
            />
          )}
        </div>
      </button>
    </div>
  );
}

export default ButtonNeuromorphic;

