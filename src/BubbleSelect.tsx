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
  maxSelectedItems?: number;
  initialSelection?: string[];
};

const BubbleSelect = ({
  onSelect,
  onDeselect,
  style,
  allowsMultipleSelection = true,
  children,
  bubbleSize,
  width = 200,
  height = 200,
  backgroundColor,
  maxSelectedItems,
  initialSelection = [],
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

  const platformProps = Platform.select({
    android: {
      onSelectNode: handleSelect,
      onDeselectNode: handleDeselect,
      bubbleSize,
      backgroundColor,
      maxSelectedItems,
    },
    ios: {
      initialSelection,
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
      {...platformProps}
    >
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, bubbleProps)
      )}
    </RNBubbleSelect>
  );
};

export default BubbleSelect;
