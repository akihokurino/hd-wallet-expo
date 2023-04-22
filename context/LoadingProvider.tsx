import { ReactNode, createContext, useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface Props {
  children: ReactNode;
}

interface LoadingContextValue {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
