/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import {colors, metrics} from '../../shared/Theme';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
// import {setUserOrderAction} from '../../store/actions';
import NavigationRef from '../../shared/RefNavigation';

function Booking(props) {
  const painting = props.Painting;
  // const painting = {
  //   id: '1',
  //   catagoryId: '1',
  //   productName: 'DVQ ART',
  //   images: require('../../assets/images/product1.jpg'),
  //   categoryName: 'dvq art',
  //   discription:
  //     'This canvas print is already perfectly stretched on a wooden frame, with hooks mounted on each panel for easy hanging on walls.',
  //   price: '51',
  // };
  const proceedToBookings = () => {
    NavigationRef.Navigate('ConfirmOrder');
  };

  const goBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        <View>
          <ImageBackground
            source={painting.images}
            style={styles.pt_imageBackground}
            imageStyle={{width: '100%'}}
            resizeMode="cover">
            <TouchableOpacity style={styles.crossWrapper} onPress={goBack}>
              <Entypo name="cross" size={metrics.width * 0.07} color="black" />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.SchedulePickerWrapper}>
          <View style={styles.pt_detailWrapper}>
            <View style={styles.pt_detailContainer}>
              <View style={styles.pt_innerUpContainer}>
                <Text style={styles.pt_artName}>{painting.productName}</Text>
                <Text style={styles.pt_artPrice}>{painting.price}$</Text>
              </View>
              <View style={styles.pt_artCategory}>
                <Avatar rounded size={24} source={painting.images} />
                <Text style={styles.pt_categoryName}>
                  {painting.categoryName}
                </Text>
              </View>
              <Text style={styles.pt_artCategoryDetail}>
                {painting.discription}
              </Text>
            </View>
          </View>
          <View style={styles.ConfirmButtonWrapper}>
            <Button
              raised
              title="SHOP NOW"
              buttonStyle={styles.confirmButton}
              titleStyle={styles.buttonText}
              onPress={proceedToBookings}
            />
          </View>
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    Painting: state.CurrentPaintingReducer,
  };
};

export default connect(mapStateToProps, {})(React.memo(Booking));

const styles = StyleSheet.create({
  crossWrapper: {
    position: 'absolute',
    padding: metrics.width * 0.002,
    backgroundColor: 'white',
    borderRadius: 7,
    top: metrics.height * 0.023,
    right: metrics.width * 0.05,
  },
  buttonText: {fontWeight: 'bold', color: colors.darkPink},
  confirmButton: {
    width: metrics.width * 0.852,
    paddingVertical: metrics.height * 0.017,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  ConfirmButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: metrics.height * 0.017,
  },
  pt_categoryName: {
    marginLeft: '3%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pt_artCategoryDetail: {
    fontSize: 14.5,
    lineHeight: 18,
    width: metrics.width * 0.852,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: colors.lightGrey3,
    marginTop: '1.8%',
  },
  pt_artCategory: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: metrics.width * 0.852,
    color: 'black',
    marginTop: '1.8%',
  },
  pt_artPrice: {
    fontWeight: 'bold',
    color: colors.darkPink,
    fontSize: 28,
  },
  pt_artName: {
    fontWeight: 'bold',
    color: colors.darkGray,
    fontSize: 19,
    width: '80%',
  },
  pt_innerUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%',
    paddingBottom: '1%',
    borderBottomColor: colors.lightGrey3,
    borderBottomWidth: 1.3,
  },
  pt_detailContainer: {
    width: '95%',
    borderRadius: 10,
    paddingHorizontal: '4%',
  },
  pt_detailWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  SchedulePickerWrapper: {
    // height: metrics.height * 0.34,
    paddingHorizontal: metrics.width * 0.005,
    marginTop: -metrics.height * 0.09,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pt_imageBackground: {
    width: '100%',
    height: metrics.height * 0.75,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});
