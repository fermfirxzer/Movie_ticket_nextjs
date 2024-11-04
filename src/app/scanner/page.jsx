"use client"; // Use this directive for client-side components in Next.js

import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const QrScannerComponent = () => {
    const videoRef = useRef(null);
    const [camHasCamera, setCamHasCamera] = useState(false);
    const [camHasFlash, setCamHasFlash] = useState(false);
    const [qrResult, setQrResult] = useState([]);
    // const []
    const [flashState, setFlashState] = useState('off');
    const [scanner, setScanner] = useState(null);
    const [selectedCamera, setSelectedCamera] = useState('environment');
    const [Err, setErr] = useState('');
    useEffect(() => {
        let isScanningAllowed=true;
        const qrScanner = new QrScanner(
            videoRef.current,
            async (scanResult) => {
                if (!isScanningAllowed) return; // Skip if scanning is temporarily disabled

                isScanningAllowed=false;
                try {
                    const dataObject = JSON.parse(scanResult.data);
                    setQrResult(dataObject.history_id);



                    await scanQRCode(dataObject);
                    setTimeout(() => {
                        isScanningAllowed = true;
                    }, 3000);

                } catch (error) {
                    setQrResult(error.Message || 'No QR code found.');
                }
            },
            {
                highlightScanRegion: true,
                highlightCodeOutline: true,
            }
        );

        qrScanner.start().then(() => {
            QrScanner.hasCamera().then((hasCamera) => {
                setCamHasCamera(hasCamera);
            });
            qrScanner.hasFlash().then((hasFlash) => {
                setCamHasFlash(hasFlash);
            });
            setScanner(qrScanner);
        });

        return () => {
            qrScanner.stop();
        };
    }, []);

    const toggleFlash = () => {
        if (scanner) {
            scanner.toggleFlash().then(() => {
                setFlashState(scanner.isFlashOn() ? 'on' : 'off');
            });
        }
    };

    const handleCameraChange = (event) => {
        const cameraId = event.target.value;
        setSelectedCamera(cameraId);
        if (scanner) {
            scanner.setCamera(cameraId).then(() => {
                scanner.hasFlash().then(hasFlash => {
                    setCamHasFlash(hasFlash);
                });
            });
        }
    };
    const handleFileChange = async (e) => {
        console.log("This is file change")
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            try {
                const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
                const dataObject = await JSON.parse(result.data);


                setQrResult(dataObject.history_id)
                await scanQRCode(dataObject);
                e.target.value = '';
            } catch (error) {
                setQrResult(error || 'No QR code found.');
            }

        }
    };
    const scanQRCode = async (qrData) => {
        try {
            const response = await fetch('/api/qrcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: qrData }),
            });

            const data = await response.json();
            window.alert(data.Message);
            setErr(data.Message);
        } catch (err) {
            setErr(err.Message);
            window.alert(err.Message);
            console.log('Error fetching QR code data:', err);
        }

    };

    return (
        <div className="p-4 text-white">
            <h1 className="text-2xl font-bold mb-4">Scan from WebCam:</h1>
            <div className="mb-4">
                <video ref={videoRef} className="border rounded w-full" />
            </div>
            <div className="mb-4">
                <b>Device has camera: </b>
                <span>{camHasCamera ? 'Yes' : 'No'}</span>
            </div>
            <div className="mb-4">
                <b>Preferred camera:</b>
                <select
                    value={selectedCamera}
                    onChange={handleCameraChange}
                    className="border p-2 rounded text-black"
                >
                    <option value="environment">Environment Facing (default)</option>
                    <option value="user">User Facing</option>
                </select>
            </div>
            <div className="mb-4">
                <b>Camera has flash: </b>
                <span>{camHasFlash ? 'Yes' : 'No'}</span>
            </div>
            <div className="mb-4">
                <button
                    onClick={toggleFlash}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    📸 Flash: <span>{flashState}</span>
                </button>
            </div>
            <div className="mb-4">
                <b>Detected QR code: </b>
                {qrResult && <span>{qrResult.history_id}</span>}
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => scanner && scanner.start()}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Start
                </button>
                <button
                    onClick={() => scanner && scanner.stop()}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Stop
                </button>
            </div>

            <h1 className="text-2xl font-bold mt-8">Scan from File:</h1>
            <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 rounded mb-4"
            />

            {qrResult && <div className='font-bold'><p>Detected QR code from history_id : {qrResult}</p><br></br><span>{qrResult.history_id}</span></div>}
            <div>
                {Err && <div className='text-xl text-red-500 text-center'>{Err}
                </div>}
            </div>
        </div>
    );
};

export default QrScannerComponent;