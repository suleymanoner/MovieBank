import Toast from 'react-native-root-toast';

export function showToast(text: string | Error) {
  const errorMessage = text instanceof Error ? text.message : text;

  Toast.show(errorMessage, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}
