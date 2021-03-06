/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {metrics, scaleFont, colors} from '../../shared/Theme';
import {Button, Overlay} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isFormValid} from './Validation';
import NavigationRef from '../../shared/RefNavigation';
import {setUserInfoAction} from '../../store/actions';
import Toast from 'react-native-root-toast';

const ConfirmOrder = (props) => {
  const [firstName, setFirstName] = useState('');
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErrMsg, setLastNameErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [address, setAddress] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const painting = props.paintingInfo;

  const Hire = () => {
    const formValidResponse = isFormValid(
      firstName,
      lastName,
      email,
      phone,
      address,
    );
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      setUserInfoAction({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      backgroundColor: colors.secondary,
      textColor: 'white',
      opacity: 1,
      position: -60,
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            phonenumber: phone,
            address: address,
            email: email,
            appname: 'Civil Care',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setFirstNameErrMsg(errMsg);
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'lastname') {
      setLastNameErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setLastNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    NavigationRef.Push('Home');
  };

  const changeFirstName = (t) => setFirstName(t);
  const changeLastName = (t) => setLastName(t);
  const changeEmail = (t) => setEmail(t);
  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const goBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign
              name="arrowleft"
              color={colors.darkGray}
              size={metrics.width * 0.08}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bookingDetailsCenterOverlay}>
          <View style={styles.bookingDetailsWrapper}>
            <ImageBackground
              source={painting.images}
              style={styles.paintingTileImage}
              imageStyle={{borderRadius: 10}}
              resizeMode="contain"
            />
            <View style={styles.DetailWrapper}>
              <Text style={styles.ProductName}>{painting.productName}</Text>
              <Text style={styles.CategoryName}>{painting.categoryName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.personalInfoWrapper}>
          <Text style={styles.personalInfoHeader}>Contact Info</Text>
        </View>
        <View style={styles.PersonalInfoWrapper}>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : colors.darkPink,
              }}>
              FIRST NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="person"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="First Name"
                style={styles.Input}
                onChangeText={changeFirstName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: lastNameErrMsg ? 'red' : colors.darkPink,
              }}>
              LAST NAME <Text> {lastNameErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="person"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.Input}
                onChangeText={changeLastName}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: emailErrMsg ? 'red' : colors.darkPink,
              }}>
              EMAIL<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="email"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Email"
                style={styles.Input}
                onChangeText={changeEmail}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: phoneErrMsg ? 'red' : colors.darkPink,
              }}>
              PHONE<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="phone-iphone"
                size={metrics.width * 0.07}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={styles.Input}
                onChangeText={changePhone}
              />
            </View>
          </View>
          <View style={styles.singlePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.personalInfoHeadingName,
                color: addressErrMsg ? 'red' : colors.darkPink,
              }}>
              ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.personalInfoInputWrapper}>
              <MaterialIcons
                name="location-pin"
                size={metrics.width * 0.07}
                style={{
                  ...styles.inputIcon,
                  alignSelf: 'flex-start',
                  marginTop: 10,
                }}
              />
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: 100, textAlignVertical: 'top'}}
                multiline={true}
                onChangeText={changeAddress}
              />
            </View>
          </View>
        </View>
        <View style={styles.ConfirmButtonWrapper}>
          <Button
            title="CONFIRM ORDER"
            raised
            buttonStyle={styles.confirmButton}
            titleStyle={{color: colors.darkPink, fontWeight: 'bold'}}
            containerStyle={styles.confirmButtonContainer}
            onPress={Hire}
            loading={loading}
          />
        </View>
        <Overlay
          isVisible={showModal}
          onBackdropPress={closeModal}
          animationType="fade">
          <View style={styles.ModalWrapper}>
            <FontAwesome
              name="check-circle"
              size={metrics.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.ModalHeadText}>THANK YOU!</Text>
            <Text style={styles.ModalSubText}>
              Your Order has been confirmed
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    paintingInfo: state.CurrentPaintingReducer,
  };
};

export default connect(mapStateToProps, {setUserInfoAction})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  paintingTileImage: {
    width: metrics.width * 0.3,
    height: metrics.width * 0.35,
    backgroundColor: 'white',
  },
  ModalSubText: {
    fontSize: metrics.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalHeadText: {
    fontSize: metrics.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ModalWrapper: {
    paddingVertical: metrics.height * 0.04,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.width * 0.8,
  },
  confirmButtonContainer: {width: '100%', elevation: 5},
  confirmButton: {
    backgroundColor: colors.primary,
    padding: metrics.height * 0.018,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: metrics.width * 0.035,
    marginBottom: metrics.height * 0.02,
  },
  Input: {
    width: '93%',
    height: metrics.height * 0.065,
  },
  inputIcon: {
    width: '7%',
    color: colors.darkPink,
  },
  personalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueGray,
    paddingHorizontal: metrics.width * 0.02,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGrey2,
  },
  personalInfoHeadingName: {
    fontSize: scaleFont(13),
    fontWeight: 'bold',
  },
  singlePersonalInfoWrapper: {
    marginVertical: 10,
  },
  PersonalInfoWrapper: {
    marginHorizontal: metrics.width * 0.035,
    marginVertical: 20,
  },
  personalInfoHeader: {
    fontSize: scaleFont(20),
    fontWeight: 'bold',
  },
  personalInfoWrapper: {
    marginHorizontal: metrics.width * 0.035,
  },
  detailsHeading: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  DetailValue: {
    color: colors.darkGray,
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginTop: metrics.height * 0.01,
  },
  bookingDetailsWrapper: {
    borderColor: '#edeef0',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginVertical: metrics.height * 0.01,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  CategoryName: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: colors.lightGrey3,
    width: metrics.width * 0.35,
  },
  ProductName: {
    color: colors.darkPink,
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    width: metrics.width * 0.35,
  },
  DetailWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: metrics.width * 0.06,
  },
  bookingDetailsCenterOverlay: {
    marginBottom: metrics.height * 0.01,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    marginLeft: metrics.width * 0.23,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: scaleFont(20),
  },
  container: {flex: 1},
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: metrics.width * 0.03,
    paddingVertical: metrics.height * 0.018,
  },
});
