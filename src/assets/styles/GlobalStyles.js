import { StyleSheet, Dimensions } from 'react-native';

const globalStyles = StyleSheet.create({
    // MAIN STYLES
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    body: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'  // used as an indicator, it can be deleted.
    },

    // SPLASH STYLES
    splashFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    splashLogo: {
       width: 130,
       height: 130 
    },
    splashContainer: {
      height:'100%',
      width: '100%'
    },
    appName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000',
    },
    appName2: {
        fontSize: 20,
        color: '#000',
    },
    wrongLogo: {
        width: 220,
        height: 200
    },

    // ONBOARDING STYLES
    onboardingBody: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 25
    },
    image1: {
        height: 180,
        width: 150,
        borderRadius: 20
    },
    image2: {
        height: 90,
        width: 150,
        borderRadius: 20,
        marginVertical: 10
    },
    image3: {
        height: 90,
        width: 150,
        borderRadius: 20,
    },
    image4: {
        height: 180,
        width: 150,
        borderRadius: 20,
        marginVertical: 10
    },
    column1: {
        paddingTop: 20,
        right: 10
    },
    column2: {
        left: 10,
    },
    onboardingFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subject: {
        fontSize: 40,
        color: '#000',
        paddingLeft: 20,
        top: 5
    },
    introduction: {
      color: '#000',
      fontSize: 16,
      left: 2
    },
    signIn: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 50,
        width: 320,
        marginVertical: 15,
    },
    signInTxt: {
        textAlign: 'center',
        fontSize: 22,
        color: '#000'
    },
    signUp: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 20,
        height: 50,
        width: 320,
    },
    signUpTxt: {
        textAlign: 'center',
        fontSize: 22,
        color: '#fff'
    },


    // MARKET & EXHIBITION STYLES
    homeBody: {
      flex: 6,
    //   top: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeBody1: {
      flex: 6,
      top: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        flexDirection: "row",
        paddingLeft: 10
    },
    artContainer: {
        width: '100%',
        height: '100%',
        marginTop: 8
    },
    artImage: {
        width: 328, 
        height: '100%', 
        borderRadius: 20, 
        resizeMode: 'cover',
    },
    artistImage: {
        width: 100, 
        height: 100, 
        borderRadius: 10, 
        //borderWidth: .5,
        borderColor: 'gray',
        alignSelf: "center"
    },
    artistNameContainer: {
        backgroundColor: '#fff', 
        marginVertical: -10, 
        borderRadius: 8,
        alignSelf: 'center',
        height: 20,
        width: '100%',
        bottom: 15,
        paddingHorizontal: 3
      },
      ArtistName: {
        color: "gray", 
        textAlign: "center", 
        // fontWeight: "bold"
    },
    artTxtBg: {
        position: 'absolute', 
        zIndex: 1, 
        backgroundColor: 'rgba(16, 18, 27, 0.4)',
        borderColor: 'rgba(255, 255, 255, 0.18)', 
        borderWidth: 1,
        height: 80,  
        borderRadius: 20, 
        bottom: 8, 
        right: 8,
        left: 8,
    },
    artNameTxt: {
        fontSize: 23, 
        //fontWeight: 'bold', 
        color: '#000', 
        paddingHorizontal: 20
    },
    artTypeTxt: {
        color: 'gray', 
        paddingHorizontal: 20,
        bottom: 3
    },
    artTypeTxt2: {
        position: 'absolute', 
        zIndex: 2, 
        color: '#fff', 
        left: 180, 
        top: 45
    },


    // TIKTOK SCREEN STYLES
    tikTokContainer: {
        width: '100%',
        height: Dimensions.get('window').height / 1,
    },
    videPlayButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    uiContainer: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    bottomContainer: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginVertical:"25%",
    },
    bottomContainer1: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginVertical:"55%",
        top: '100%'
    },
    topLeftIcon: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        border: 1,
        borderRadius: 14,
        borderColor: '#FFFFFF',
        width: 45,
        height: 45,
        marginHorizontal: -20,
    },
    handle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    description: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 10,
    },
    songRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    songName: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#4c4c4c',
    },

    //  right container
    rightContainer: {
        alignSelf: 'flex-end',
        height: "25%",
        justifyContent: 'space-between',
        paddingTop: 10,
        right: 10
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff',
    },
    iconContainer: {
        alignItems: 'center',
    },
    statsLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 5,
    },
    viewArtist: {
        marginVertical: 10,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    viewMiddleIcon: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        marginHorizontal: 30,
        marginVertical: 60,
    },
    secondBottomContainer: {
        width: '100%',
        height: '90%',
        marginVertical: '6%',
        alignSelf: 'center',
        backgroundColor: 'rgba(16,18,27,0.4)',
        borderColor: 'rgba(255, 255, 255, 0.18)',
        borderWidth: 1,
        shadowOpacity: 20,
        border: 1,
        borderRadius: 20,
        flexDirection: 'column',
        top: 50
    },
    secondBottomContainer1: {
        width: '80%',
        height: '70%',
        marginVertical: '6%',
        alignSelf: 'center',
       // backgroundColor: 'rgba(16,18,27,0.4)',
        borderColor: 'rgba(255, 255, 255, 0.18)',
        borderWidth: 1,
        shadowOpacity: 20,
        border: 1,
        borderRadius: 10,
        flexDirection: 'column',
    },
    viewDescription: {
        alignSelf: 'flex-start',
        marginHorizontal: 15,
        width: '90%',
        // top: 10
    },
    artistName: {
        fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'Poppins',
        color: '#F5F5F5',
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
    },
    button: {
        width: 10,
        height: 10,
        backgroundColor: '#347af0',
        borderRadius: 5,
        marginHorizontal: 5
    },
    price: {
        fontFamily: 'Poppins',
        alignSelf: 'flex-end',
        fontSize: 18,
        // fontWeight: 'bold',
        marginVertical: -45,
        color: '#F5F5F5',
        paddingBottom: 10
    },
    cartIcon: {
        alignSelf: 'flex-end',
        width: 45,
        height: 45,
        marginHorizontal: -10,
    },
    artistImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginVertical: 10,
        borderColor: 'rgba(196, 196, 196, 0.51)',
        borderWidth: 4,
    },
    topIconView: {
        flexDirection: 'row',
        marginVertical: 20,
        width: '80%',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },

    // CART STYLES
    flatlistView: {
        // borderRadius: 10, 
    //    backgroundColor: 'red',
        marginVertical: -20
    },
    cancelIcon: {
        width: 37, 
        height: 37, 
        borderRadius: 18.5, 
        backgroundColor: "#FF5353", 
        position: "absolute", 
        zIndex: 10, 
        right: 18, 
        top: 25
    },
    closeIconStyle: {
        textAlign: "center", 
        top: 5, 
        position: "relative"
    },
    cartImage: {
        width: "95%", 
        height: 180, 
        alignSelf: "center", 
        borderRadius: 15,
        top: 20
    },
    priceContainer: {
        flexDirection: "column",
        width: "90%",
        height: 70,
        borderRadius: 10,
        bottom: 57,
        backgroundColor: 'rgba(16, 18, 27, 0.4)',
        alignSelf: "center"
    },
    artTxtName: {
        fontSize: 22, 
        color: "#FFFFFF", 
        fontWeight: "bold", 
        marginHorizontal: 20,
        marginVertical: 10
    },
    priceTxt: {
        fontSize: 16, 
        color: "#FFFFFF", 
        fontWeight: "bold",
        marginHorizontal: 20,
        marginVertical: -10
    },
    Top: {
        flexDirection: "row",
        marginTop: "16%",
        justifyContent: "space-around",
        marginRight: 90,
        width: "30%"
    },
    backButton: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        marginHorizontal: 15,
        marginBottom: 30
    },
    backButtonView: {
        justifyContent: "center", 
        height: 70
    },
    title: {
        color: "#000000", 
        fontSize: 24, 
        fontWeight: "bold", 
        textAlign: "center", 
        alignSelf: "center", 
        right: -100,
        // justifyContent: 'center'
    },
    

    // PAYMENT SUUCESS & FAILURE
     paymeyntFailure: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
      paddingTop: 70
    },
     paymeyntSuccess: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#000',
      paddingTop: 70
    },


    // CARD
    cardContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
    },
    cardBody: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        // backgroundColor: 'red',  // used as an indicator, it can be deleted.
        // padding: 20
    },

    // SHIPPING
    shippingFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        bottom: 55
    }
})

export { globalStyles };