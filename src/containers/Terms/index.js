import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { hp, wp, normalize, isIOS, isX } from '../../styles/responsiveScreen';
import SucessFullDefault from '../../Components/SucessFullDefault/SucessFullDefault';
import colors from '../../assets/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackHeader from '../../Components/BackHeader';
import { useTranslation } from 'react-i18next';
import BigButton from '../../Components/BigButton';
import { ScrollView } from 'react-native-gesture-handler';
import FontText from '../../Components/common/FontText';

export const routeName = 'Terms';
const Terms = ({ navigation }) => {
    const { t } = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <BackHeader
                style={{ paddingTop: 5 }}
                title={'Terms & Privacy Policy'}
                titleColor="violet"
                BackonPress={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={styles.container}>
                    {/* <Text style={{
                        color: colors.black,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: 25,

                        margin: 15
                    }}>Razor Touch</Text> */}
                    <Text>

                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                OUR SERVICE GUARANTEE
                            </FontText>
                            <Text style={styles.paragraph}>
                                We make every attempt to ensure that you are
                                satisfied with your experience at Razor Touch  Salon.
                                In the event that you are not completely satisfied,
                                please let us know at the time of your service or within 48 hours after your service has been performed.

                            </Text>
                        </View>
                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                RIGHT TO REFUSE SERVICE
                            </FontText>
                            <Text style={styles.paragraph}>
                                Razor Touch Salon reserves
                                the right to refuse service to anyone
                                demonstrating inappropriate
                                behaviour to any member of our staff.
                            </Text>
                        </View>
                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                RETURN POLICY
                            </FontText>
                            <Text style={styles.paragraph}>
                                We are happy to accept a
                                return of any retail products you
                                purchased within 7 days of original purchase.
                                No cash value is given.
                            </Text>
                        </View>
                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                METHODS OF PAYMENT
                            </FontText>
                            <Text style={styles.paragraph}>
                                Razor Touch Salon accepts Visa, Master Card,
                                Cash and Cash Transfers.
                            </Text>
                        </View>


                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                REFUNDS
                            </FontText>
                            <Text style={styles.paragraph}>
                                All services are non-refundable but we will be
                                more than happy to schedule a corrective service
                                free of charge.

                                The service must be a mistake from the service provider, not something you might have changed your mind (after the service has been performed).

                                In case of a disagreement, a redo must be
                                validated by management.

                                You have 48 hours to contact the Salon to receive a complimentary service to adjust any dissatisfaction.

                                Corrective services will not be allowed 5 days past initial service date.

                                It is important you contact the Salon as soon as you are unhappy so we can schedule you ASAP for a corrective service.

                                Please keep in mind, using box color or going from Darker to Lighter tones may result
                                in more than one service to achieve your desired result.

                            </Text>
                        </View>
                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                ONLINE BOOKING
                            </FontText>
                            <Text style={styles.paragraph}>
                                Your request will be scheduled based on Stylist/Beautician availability. Your request is not approved until
                                you receive confirmation from Razor Touch Salon.

                            </Text>
                        </View>

                        <View>
                            <FontText
                                color={'red'}
                                name={'poppins-semibold'}>
                                HEAD LICE RESERVATION
                            </FontText>
                            <Text style={styles.paragraph}>
                                You may book a reservation by calling or texting our salon, through our social media or by email.
                                It is against Studio Policy to perform services on clients with head lice. If a client has been
                                diagnosed with head lice while receiving a
                                service in the salon, we would not be able to
                                complete the service the same day.
                                We would be able to complete the service
                                within 48 hours once the head lice treatment
                                has been completed.
                            </Text>
                        </View>



                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                48 HOUR CANCELLATION POLICY
                            </FontText>
                            <Text style={styles.paragraph}>
                                In order to respect the time of both our guests
                                and our staff, we simply as that you notify us of a cancellation or rescheduling at least 48 hours prior to the appointment.

                                If an appointment is re-scheduled 3 individual
                                times within the 48-hour window you will be
                                placed on a walk-in basis only. This is so that we may have ample time to fill the appointment time should you need to cancel your service.

                                Appointments that are cancelled less than 48
                                hours prior will result in a N5000 fee charged on your next service.

                                We send a reminder text to each customer the
                                day before your booking. Please note that this is just a reminder and We do not accept
                                cancellations on the day before your appointment. If you do cancel, we will treat the
                                cancellation as a no show.
                            </Text>
                        </View>

                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                LATE
                            </FontText>
                            <Text style={styles.paragraph}>
                                Please be courteous to your Stylist/Beautician
                                and other clients. If you are more than 15 minutes
                                late for your appointment, we may have to reschedule
                                your appointment.
                            </Text>
                        </View>


                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                CHILDREN
                            </FontText>
                            <Text style={styles.paragraph}>
                                Our Children's haircut is for children under the
                                age of 12. Children over the age of 12 are
                                charged for full price services. Razor Touch
                                Salon is a Family Friendly Salon. However,
                                all children under the age of 12 must be
                                accompanied by an adult at all times.
                            </Text>
                        </View>

                        <View>
                            <FontText
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                                color={'red'}
                                name={'poppins-semibold'}>
                                PRIVACY
                            </FontText>
                            <Text style={styles.paragraph}>
                                Information collected is only used if we need to
                                contact you for further information regarding
                                your appointment.
                            </Text>
                        </View>
                    </Text>
                </View>
                <View style={{ justifyContent: 'flex-end', marginBottom: hp(2) }}>
                    <BigButton title={'ACCEPT'} onClick={() => navigation.goBack()} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: colors.white,
    },
    card: {
        color: colors.white,
    },
    paragraph: {
        fontSize: 15,
        lineHeight: 25,
        marginBottom: 15,
    }
});
export default Terms;
