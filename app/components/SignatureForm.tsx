import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from 'react-bootstrap';

export default function SignatureForm({ onSignatureChange, clearLabel }) {
  const sigCanvas = useRef(null);

  // Clears the pad and tells the parent form the signature is gone
  const clear = () => {
    sigCanvas.current.clear();
    onSignatureChange(null);
  };

  const handleEnd = () => {
    // Send the image data to the parent whenever the user stops drawing
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    onSignatureChange(dataURL);
  };

  // Inside SignatureForm.tsx
  <SignatureCanvas
    ref={sigCanvas}
    onEnd={handleEnd}
    canvasProps={{
      width: 500,
      height: 200,
      className: 'signature-pad',
      // ADD THIS LINE TO FIX THE WARNING
      willReadFrequently: true
    }}
  />

  return (
    <div className="mb-3">
      <div style={{ border: '1px solid #ced4da', borderRadius: '4px', background: '#f8f9fa' }}>
        <SignatureCanvas
          ref={sigCanvas}
          onEnd={handleEnd}
          canvasProps={{
            width: 500,
            height: 200,
            className: 'signature-pad'
          }}
        />
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="mt-2"
        onClick={clear}
      >
        {clearLabel || "Clear Signature"}
      </Button>
    </div>
  );
}