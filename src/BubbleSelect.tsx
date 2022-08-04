import React from 'react';
import { BubbleNode, BubbleProps } from './Bubble';
import {
  NativeSyntheticEvent,
  requireNativeComponent,
  Platform,
} from 'react-native';

const RNBubbleSelect = requireNativeComponent('RNBubbleSelectView');

export type BubbleSelectProps = Omit<BubbleProps, 'text' | 'id'> & {
  onSelect?: (bubble: BubbleNode) => void;
  onDeselect?: (bubble: BubbleNode) => void;
  bubbleSize?: number;
  allowsMultipleSelection?: boolean;
  children: React.ReactNode;
  style?: object;
  width?: number;
  height?: number;
  backgroundColor?: string;
};

const BubbleSelect = ({
  onSelect,
  onDeselect,
  style,
  allowsMultipleSelection,
  children,
  bubbleSize,
  width = 200,
  height = 200,
  backgroundColor,
  ...bubbleProps
}: BubbleSelectProps) => {
  const defaultStyle = {
    flex: 1,
    width,
    height,
  };

  const handleSelect = (event: NativeSyntheticEvent<BubbleNode>) => {
    if (onSelect) {
      onSelect(event.nativeEvent);
    }
  };

  const handleDeselect = (event: NativeSyntheticEvent<BubbleNode>) => {
    if (onDeselect) {
      onDeselect(event.nativeEvent);
    }
  };

  const androidProps = Platform.select({
    android: {
      onSelectNode: handleSelect,
      onDeselectNode: handleDeselect,
      bubbleSize,
      backgroundColor,
    },
    default: {},
  });

  return (
    <RNBubbleSelect
      style={[defaultStyle, style]}
      allowsMultipleSelection={allowsMultipleSelection}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
      bubbleSize={bubbleSize}
      magneticBackgroundColor={backgroundColor}
      {...androidProps}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, bubbleProps)
      )}
    </RNBubbleSelect>
  );
};

export default BubbleSelect;
