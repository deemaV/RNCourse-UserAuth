import React, { useState, useContext } from "react";
import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { database } from "../firebase";
import { set, ref } from "firebase/database";
import CalendarPicker from "react-native-calendar-picker";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/auth-context";

function BookLeave() {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    let totalDays = null;
    const authCtx = useContext(AuthContext);

    function countCertainDays(days, d0, d1) {
        var ndays = 1 + Math.round((d1 - d0) / (24 * 3600 * 1000));
        var sum = function (a, b) {
            return a + Math.floor((ndays + ((d0.getDay() + 6 - b) % 7)) / 7);
        };
        return days.reduce(sum, 0);
    }

    const onDateChange = (date, type) => {
        setSelectedEndDate(null);
        if (type === "END_DATE") {
            setSelectedEndDate(
                new Date(date).getDate() +
                    "-" +
                    new Date(date).toLocaleString("default", {
                        month: "short",
                    }) +
                    "-" +
                    new Date(date).getFullYear()
            );
        } else {
            setSelectedStartDate(
                new Date(date).getDate() +
                    "-" +
                    new Date(date).toLocaleString("default", {
                        month: "short",
                    }) +
                    "-" +
                    new Date(date).getFullYear()
            );
        }
    };

    let firstDate = null;
    let endDate = null;
    let confirmButton = null;
    const fullEmail = authCtx.email;
    const userEmail = fullEmail.split(".").join("");

    function Push(selectedStartDate, selectedEndDate, totalDays, userEmail) {
        set(
            ref(
                database,
                userEmail +
                    "/" +
                    selectedStartDate.replace(/-/g, "") +
                    "-" +
                    selectedEndDate.replace(/-/g, "")
            ),
            {
                startDate: selectedStartDate,
                endDate: selectedEndDate,
                totalDays: totalDays,
                id:
                    selectedStartDate.replace(/-/g, "") +
                    "-" +
                    selectedEndDate.replace(/-/g, ""),
            }
        );
    }

    selectedStartDate ? (firstDate = new Date(selectedStartDate)) : null;
    selectedEndDate
        ? [
              ((totalDays = countCertainDays(
                  [1, 2, 3, 4, 5],
                  new Date(selectedStartDate),
                  new Date(selectedEndDate)
              )),
              (endDate = new Date(selectedEndDate))),
              (confirmButton = (
                  <Button
                      onPress={Push(
                          selectedStartDate,
                          selectedEndDate,
                          totalDays,
                          userEmail
                      )}
                  >
                      Confirm
                  </Button>
              )),
          ]
        : null;

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>Choose Dates</Text>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxDate={
                        new Date(
                            new Date().setFullYear(new Date().getFullYear() + 1)
                        )
                    }
                    weekdays={[
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thur",
                        "Fri",
                        "Sat",
                        "Sun",
                    ]}
                    months={[
                        "January",
                        "Febraury",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ]}
                    previousComponent={
                        <Feather
                            name="arrow-left"
                            color={Colors.primary500}
                            size={16}
                        />
                    }
                    nextComponent={
                        <Feather
                            name="arrow-right"
                            color={Colors.primary500}
                            size={16}
                        />
                    }
                    todayBackgroundColor={Colors.primary100}
                    selectedDayColor={Colors.primary500}
                    selectedDayTextColor="#000000"
                    textStyle={{
                        color: "#000000",
                    }}
                    width={Dimensions.get("window").width}
                    onDateChange={onDateChange}
                />
                <View style={styles.selectBox}>
                    <View style={styles.subcontainerText}>
                        <Text style={styles.textStyle}>
                            Selected Start Date:{" "}
                        </Text>
                        <Text style={styles.textStyle}>
                            Selected End Date:{" "}
                        </Text>
                        <Text style={styles.textStyle}>Total Weekdays: </Text>
                    </View>
                    <View style={styles.subcontainerDays}>
                        <Text style={styles.textStyle}>
                            {selectedStartDate ? selectedStartDate : " "}
                        </Text>
                        <Text style={styles.textStyle}>
                            {new Date(selectedEndDate) >= new Date()
                                ? selectedEndDate
                                : " "}
                        </Text>
                        <Text style={styles.textStyle}>
                            {new Date(selectedEndDate) >= new Date()
                                ? " " + totalDays
                                : " "}
                        </Text>
                    </View>
                </View>
                {confirmButton}
            </View>
        </ScrollView>
    );
}

export default BookLeave;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: Colors.primary100,
        padding: 16,
    },
    subcontainerText: {
        flex: 2,
        flexDirection: "column",
        alignItems: "flex-end",
    },
    subcontainerDays: {
        flex: 2,
        flexDirection: "column",
        alignItems: "flex-start",
    },
    textStyle: {
        backgroundColor: "#E6E2DD",
        marginVertical: 3,
    },
    selectBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    titleStyle: {
        textAlign: "center",
        fontSize: 20,
        margin: 20,
    },
});
