// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

type TabBarIconProps = IconProps<ComponentProps<typeof Ionicons>['name']> & {
  focused?: boolean;  
};

export function TabBarIcon({ focused = false,style, ...rest }: TabBarIconProps) {
  return (
    <Ionicons 
      style={
        [
          { marginBottom: -3. ,
            fontSize:35,
           }, 
          focused ? focusedShadowStyle : {},
          style
        ]} 
        {...rest} 
    />
  );
}

const focusedShadowStyle = {
  textShadowColor: '#000',
  opacity: 0.8,
  textShadowOffset: { width: 0, height: 0.8 },
  textShadowRadius: 2,
};
