/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import Data from '../../Dummydata/DummyData';
import {colors, metrics} from '../../shared/Theme';
import Listing from '../../components/listing/listing';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import NavigationRef from '../../shared/RefNavigation';
import {setCurrentPaintingAction} from '../../store/actions';

function Home(props) {
  useEffect(() => {
    filterCategories();
  }, []);

  const [categories, setCategories] = useState([]);
  const [currentCat, setCurrentCat] = useState({
    id: '-1',
    catagoryName: 'All',
  });
  const [tabProducts, setTabProducts] = useState([]);

  const filterCategories = () => {
    let arr = [];
    arr.push({
      id: '-1',
      catagoryName: 'All',
    });
    for (let i = 0; i < Data.catagory.length; i++) arr.push(Data.catagory[i]);
    setCategories(arr);
  };

  const PaintingTilePressed = (item) => {
    props.setCurrentPaintingAction(item);
    NavigationRef.Navigate('Products');
  };

  const changeTab = (tab) => {
    setCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.catagoryId === tab.id,
    );
    setTabProducts(filteredProducts);
  };

  const GotoSearch = () => NavigationRef.Navigate('Search');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.HeaderBarWrapper}>
          <View style={styles.HeaderBarInnerWrapper}>
            <Text style={styles.HeaderText}>
              What painting Style are {'\n'} you looking for?
            </Text>
            <TouchableOpacity
              onPress={GotoSearch}
              style={{
                padding: 7,
                borderRadius: 12,
              }}>
              <FontAwesome name="search" size={28} color={colors.lightGrey3} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listingWrapper}>
          <Listing
            data={categories}
            renderItem={({item}) => (
              <HomeTabs
                item={item}
                currentCat={currentCat}
                changeTab={changeTab}
              />
            )}
          />
        </View>
        <View style={styles.PaintingTilesWrapper}>
          {tabProducts.length > 0
            ? tabProducts.map((item, index) => {
                return (
                  <PaintingTiles
                    key={item.id}
                    item={{...item}}
                    categories={Data.catagory}
                    PaintingTilePressed={PaintingTilePressed}
                  />
                );
              })
            : Data.product.map((item, index) => {
                return (
                  <PaintingTiles
                    key={item.id}
                    item={{...item}}
                    categories={Data.catagory}
                    PaintingTilePressed={PaintingTilePressed}
                  />
                );
              })}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

export const PaintingTiles = ({item, categories, PaintingTilePressed}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        PaintingTilePressed({
          ...item,
          categoryName: categories[parseInt(item.catagoryId) - 1].catagoryName,
        })
      }>
      <ImageBackground
        source={item.images}
        style={styles.pt_imageBackground}
        imageStyle={{borderRadius: 10}}
        resizeMode="cover">
        <View style={styles.pt_detailWrapper}>
          <View style={styles.pt_detailContainer}>
            <View style={styles.pt_innerUpContainer}>
              <Text style={styles.pt_artName}>{item.productName}</Text>
              <Text style={styles.pt_artPrice}>{item.price}$</Text>
            </View>
            <Text style={styles.pt_artCategory}>
              {categories[parseInt(item.catagoryId) - 1].catagoryName}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const HomeTabs = ({item, currentCat, changeTab}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() => changeTab(item)}>
      <Text
        style={{
          ...styles.HomeTabsText,
          color:
            item.catagoryName === currentCat.catagoryName
              ? 'black'
              : colors.lightGrey3,
        }}>
        {item.catagoryName}
      </Text>
      {item.catagoryName === currentCat.catagoryName ? (
        <View style={styles.tabIndicator} />
      ) : null}
    </TouchableOpacity>
  );
};

export default connect(null, {setCurrentPaintingAction})(Home);

const styles = StyleSheet.create({
  HeaderText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 22,
  },
  HeaderBarInnerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: metrics.width * 0.88,
  },
  PaintingTilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  HeaderBarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.smallMargin,
  },
  container: {flex: 1},
  pt_artCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: '5.5%',
    textAlignVertical: 'center',
    color: 'black',
  },
  pt_artPrice: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },
  pt_artName: {
    fontWeight: 'bold',
    color: colors.darkGray,
    fontSize: 10,
    width: '80%',
  },
  pt_innerUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '3.5%',
    borderBottomColor: colors.lightGrey3,
    borderBottomWidth: 1.3,
  },
  pt_detailContainer: {
    backgroundColor: 'white',
    opacity: 0.9,
    width: '95%',
    borderRadius: 10,
    paddingHorizontal: '5%',
  },
  pt_detailWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '2.5%',
    width: '100%',
  },
  pt_imageBackground: {
    width: metrics.width * 0.42,
    height: metrics.width * 0.687,
    position: 'relative',
    marginVertical: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  tabIndicator: {width: 8, borderWidth: 1.8, borderRadius: 10, marginTop: 4},
  HomeTabsText: {
    fontWeight: '700',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 15,
    height: metrics.width * 0.1, //1%
    paddingHorizontal: metrics.width * 0.02,
    paddingTop: metrics.width * 0.02,
  },
});
