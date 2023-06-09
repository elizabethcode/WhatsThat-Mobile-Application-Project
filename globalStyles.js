import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    backgroundColor: "#193A6F",
  },
  OuterContainer:{
    backgroundColor: "#F98125",
  },

  Titles: {
    fontSize: 20,
    color: "#F98125",
  },
  Header: {    
    paddingVertical: 10,
    backgroundColor: "#F98125",
    paddingHorizontal: 15,
  },
  HeaderText: {
    marginTop: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  Button: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#F98125",
    height: 50,
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});


