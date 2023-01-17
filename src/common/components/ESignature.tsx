/* eslint-disable */
import * as React from "react";
import { useEffect, useRef } from "react";
import "./styles/e-signature.style.css";

const MOVE = "move";
const DOWN = "down";
const UP = "up";
const OUT = "out";

const ESignature: React.FunctionComponent<{ onUseSignature : (signatureData : string) => void }> = (props) => {

    const { onUseSignature } = props;

    let canvas: any,
        drawingContext: any,
        isMouseDownOrTouchStart = false,
        previousX = 0,
        currentX = 0,
        previousY = 0,
        currentY = 0,
        isDrawingADot = false;

    const canvasRef = useRef(null);
    //   const downloadRef = useRef(null);

    const initializeDrawing = () => {
        canvas = canvasRef.current;
        drawingContext = canvas.getContext("2d");

        const findXYMOVE = (e: any) => {
            findXY(MOVE, e);
        };
        const findXYDOWN = (e: any) => {
            findXY(DOWN, e);
        };
        const findXYUP = (e: any) => {
            findXY(UP, e);
        };
        const findXYOUT = (e: any) => {
            findXY(OUT, e);
        };

        // add mouse events
        canvas.addEventListener("mousemove", findXYMOVE);
        canvas.addEventListener("mousedown", findXYDOWN);
        canvas.addEventListener("mouseup", findXYUP);
        canvas.addEventListener("mouseout", findXYOUT);

        // add touch events
        canvas.addEventListener("touchmove", findXYMOVE);
        canvas.addEventListener("touchstart", findXYDOWN);
        canvas.addEventListener("touchend", findXYUP);

        return () => {
            // remove mouse events
            canvas.removeEventListener("mousemove", findXYMOVE);
            canvas.removeEventListener("mousedown", findXYDOWN);
            canvas.removeEventListener("mouseup", findXYUP);
            canvas.removeEventListener("mouseout", findXYOUT);

            // remove touch events
            canvas.removeEventListener("touchmove", findXYMOVE);
            canvas.removeEventListener("touchstart", findXYDOWN);
            canvas.removeEventListener("touchend", findXYUP);
        };
    };

    useEffect(() => {
        initializeDrawing();
    }, []);

    const draw = () => {
        drawingContext.beginPath();
        drawingContext.moveTo(previousX, previousY);
        drawingContext.lineTo(currentX, currentY);
        drawingContext.lineWidth = 2;
        drawingContext.strokeStyle = "#222222";
        drawingContext.stroke();
        drawingContext.closePath();
    };

    const getPosition = (canvas: any, evt: any) => {
        var rect = canvas.getBoundingClientRect(),
            scaleX = canvas.width / rect.width,
            scaleY = canvas.height / rect.height;

        return {
            x:
                ((evt?.clientX || (evt.touches && evt.touches["0"]?.clientX)) -
                    rect.left) *
                scaleX,
            y:
                ((evt?.clientY || (evt.touches && evt.touches["0"]?.clientY)) -
                    rect.top) *
                scaleY
        };
    };

    const findXY = (action: any, e: any) => {
        const { x, y } = getPosition(canvas, e);

        if (action === DOWN) {
            previousX = currentX;
            previousY = currentY;
            currentX = x;
            currentY = y;

            isMouseDownOrTouchStart = true;
            isDrawingADot = true;
            if (isDrawingADot) {
                drawingContext.beginPath();
                drawingContext.fillRect(currentX, currentY, 1, 1);
                drawingContext.closePath();
                isDrawingADot = false;
            }
        }
        if (action === UP || action === OUT) {
            isMouseDownOrTouchStart = false;
        }
        if (action === MOVE) {
            if (isMouseDownOrTouchStart) {
                previousX = currentX;
                previousY = currentY;
                currentX = x;
                currentY = y;
                draw();
            }
        }
    };

    const handleSave = () => {
        const url = canvasRef.current.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image_name.png");
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
    };

    const handleUseSignature = () => {
        const url = canvasRef.current.toDataURL();
        onUseSignature(url);
    };

    const handleClear = () => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        onUseSignature("");
    };

    return (
        <>
            <canvas className="sig-canvas" style={{minWidth : "300px", width: "100%", height: "160px"}} ref={canvasRef} />
            <button className="signature-action-btn" onClick={handleSave}>Save as image</button>
            <button className="signature-action-btn" onClick={handleUseSignature}>Use Signature</button>
            <button className="signature-action-btn" onClick={handleClear}>Clear</button>
        </>
    );
};

export default ESignature;
