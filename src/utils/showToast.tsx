import Toast from 'react-native-root-toast';

export function showToast(text: string) {
  Toast.show(text, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
}
