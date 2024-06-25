import { ThemedText } from "@/src/components/ThemedText";
import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ISource } from ".";
import { Skeleton } from "moti/skeleton";

export const GroupAvatar: React.FC<ISource> = ({ data, loading }) => {
  const { urls = [], length = 0 } = useMemo(() => {
    return {
      length: data?.length - 4,
      urls: data?.filter((e) => e.url)?.slice(0, 4),
    };
  }, [data]);

  if (urls?.length <= 0 && !loading) return <></>;
  return (
    <View style={styles.list}>
      {!loading && data?.length > 0 ? (
        <>
          {urls?.map((e, key) => {
            return (
              <View
                style={[styles.item, { marginLeft: -1 * key + 1 }]}
                key={key + "group--avatar"}
              >
                <Image
                  source={{
                    uri: e.url,
                  }}
                  style={styles.avatar}
                />
                <View style={styles.stroke} />
              </View>
            );
          })}
          {length > 0 && (
            <ThemedText type="font-12-500" style={{ marginLeft: 8 }}>
              +{length}
            </ThemedText>
          )}
        </>
      ) : (
        <></>
      )}
      {loading && (
        <>
          <Skeleton width={16} height={16} />
          <Skeleton width={16} height={16} />
          <Skeleton width={16} height={16} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 16,
    height: 16,
    resizeMode: "center",
    borderRadius: 100,
    position: "static",
    zIndex: 2,
  },
  stroke: {
    width: 20,
    height: 20,
    backgroundColor: "black",
    position: "absolute",
    zIndex: 1,
    borderRadius: 100,
  },
});
