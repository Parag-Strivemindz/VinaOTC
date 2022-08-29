function useNavigations(screenName, navigation) {
  return (params = {}) => {
    if (screenName) {
      navigation.navigate(screenName, {
        ...params,
      });
    }
  };
}
export default useNavigations;
