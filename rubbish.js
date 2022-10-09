 {submit ? (
        <FlatList
          keyExtractor={item => item.id}
          data={search_product}
          style={{flex: 1, top: WP(6), marginVertical: WP(13)}}
          ListEmptyComponent={renderEmptyContainer()}
          renderItem={({item}) => {
            return (
              <ScrollView>
                <TouchableOpacity onPress={id => setSelectedId(item?.id)}>
                  {/* selectedId */}
                  <View
                    style={
                      selectedId == item?.id
                        ? {borderWidth: 1, borderColor: '#3DD598'}
                        : null
                    }>
                    <ListItem>
                      <Avatar rounded source={{uri: item?.image}} />
                      <ListItem.Content>
                        <ListItem.Title
                          style={{fontWeight: 'bold', color: COLOR.blackColor}}>
                          {item?.name}
                        </ListItem.Title>
                        <ListItem.Subtitle
                          style={{fontWeight: '600', color: COLOR.blackColor}}>
                          ID {item?.id}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Title
                        style={{fontWeight: 'bold', color: COLOR.blackColor}}>
                        <Text>
                          {'\u20A6'}
                          {item?.price}
                        </Text>
                      </ListItem.Title>
                    </ListItem>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            );
          }}
        />
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={productData}
          style={{flex: 1, top: WP(6), marginVertical: WP(13)}}
          ListEmptyComponent={renderEmptyContainer()}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={id => setSelectedId(item?.id)}>
                  {/* selectedId */}
                  <View
                    style={
                      selectedId == item?.id
                        ? {borderWidth: 1, borderColor: '#3DD598'}
                        : null
                    }>
                    <ListItem>
                      <Avatar rounded source={{uri: item?.image}} />
                      <ListItem.Content>
                        <ListItem.Title
                          style={{fontWeight: 'bold', color: COLOR.blackColor}}>
                          {item?.name}
                        </ListItem.Title>
                        <ListItem.Subtitle
                          style={{fontWeight: '600', color: COLOR.blackColor}}>
                          ID {item?.id}
                        </ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Title
                        style={{fontWeight: 'bold', color: COLOR.blackColor}}>
                        <Text>
                          {'\u20A6'}
                          {item?.price}
                        </Text>
                      </ListItem.Title>
                    </ListItem>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <View>
          <Text>
            {allProductpagintion?.current_page || allpagintion?.current_page}-
            {allProductpagintion?.last_page | allpagintion?.last_page} {'items'}
          </Text>
        </View>

        {/* pagintaion icon */}
        <View style={{left: WP(33)}}>
    
          <View style={{flexDirection: 'row', marginHorizontal: WP(3)}}>
            <TouchableOpacity
              onPress={() => BackPagePagination()}
              disabled={allpagintion?.current_page == 1 ? true : false}
              style={styles.iconContainer}>
              <Entypo name="chevron-thin-left" size={12} />
            </TouchableOpacity>
            {/* BackPagePagination */}

            <TouchableOpacity
              onPress={() => NextPagePagination()}
              style={[styles.iconContainer, {left: WP(2)}]}
              disabled={
                allpagintion?.current_page != allpagintion?.last_page
                  ? false
                  : true
              }>
              <Entypo name="chevron-thin-right" size={12} />
            </TouchableOpacity>

            {/* {allpagintion?.current_page != allpagintion?.last_page && (
              <TouchableOpacity style={[styles.iconContainer, {left: WP(2)}]}>
                <Entypo name="chevron-thin-left" size={12} />
              </TouchableOpacity>
            )} */}
          </View>
        </View>
      </View>