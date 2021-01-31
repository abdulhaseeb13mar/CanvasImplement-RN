/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import WrapperScreen from '../../components/WrapperScreen/WrapperScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchBar from '../../components/searchBar/searchBar';
import Data from '../../Dummydata/DummyData';
import {colors, metrics} from '../../shared/Theme';
import NavigationRef from '../../shared/RefNavigation';
import {PaintingTiles} from '../Home/Home';
import {connect} from 'react-redux';
import {setCurrentPaintingAction} from '../../store/actions';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? null : RenderTiles(SearchedItems);
  };

  const PaintingTilePressed = (item) => {
    props.setCurrentPaintingAction(item);
    NavigationRef.Navigate('Products');
  };

  const RenderTiles = (BannerArr) => {
    return BannerArr.map((item) => (
      <PaintingTiles
        key={item.id}
        item={{...item}}
        categories={Data.catagory}
        PaintingTilePressed={PaintingTilePressed}
      />
    ));
  };

  const goBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
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
        <View style={styles.SearchBarWrapper}>
          <SearchBar changeSearchText={changeSearchText} />
        </View>
        <View style={styles.PaintingTilesWrapper}>
          {searchText !== '' ? RenderSearchedResult() : null}
        </View>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

export default connect(null, {setCurrentPaintingAction})(Search);

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: metrics.width * 0.03,
    paddingVertical: metrics.height * 0.018,
  },
  PaintingTilesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  SearchBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: metrics.height * 0.003,
  },
  container: {flex: 1},
});
