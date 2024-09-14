import { View, ViewStyle } from "react-native";

interface CardProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: CardProps) {
  return (
    <View
      style={{
        backgroundColor: "#f9f9f9", // Light background
        borderRadius: 12, // Rounded corners
        padding: 20,
        marginVertical: 10,
        shadowColor: "#000", // Shadow for depth effect
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8, // Shadow for Android
        ...style,
      }}
    >
      {children}
    </View>
  );
}
