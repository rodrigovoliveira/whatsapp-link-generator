declare module 'react-avatar-editor' {
  import React from 'react';

  interface AvatarEditorProps {
    image: string;
    width?: number;
    height?: number;
    border?: number;
    borderRadius?: number;
    color?: number[];
    scale?: number;
    rotate?: number;
    position?: { x: number; y: number };
    onPositionChange?: (position: { x: number; y: number }) => void;
    onLoadSuccess?: (imgInfo: { width: number; height: number }) => void;
    onLoadFailure?: (error: Error) => void;
    onImageReady?: () => void;
    onMouseUp?: () => void;
    onMouseMove?: () => void;
    onImageChange?: () => void;
    disableBoundaryChecks?: boolean;
    crossOrigin?: string;
  }

  class AvatarEditor extends React.Component<AvatarEditorProps> {
    getImage(): HTMLCanvasElement;
    getImageScaledToCanvas(): HTMLCanvasElement;
  }

  export default AvatarEditor;
} 