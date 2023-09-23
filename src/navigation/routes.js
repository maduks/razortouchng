import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/core';
import Onboarding, {
  routeName as onboardinRouteName,
} from '../containers/Onboarding';
import Home, { routeName as homeRouteName } from '../containers/Home';
import Appointment, {
  routeName as appointmentRouteName,
} from '../containers/Appointment/Appoinment_TopTab';

import Blog, { routeName as blogRouteName } from '../containers/Blog';
import Setting, { routeName as settingRouteName } from '../containers/Settings';
import TabBar from '../Components/TabBar';
import Personalinformation, {
  routeName as PersonalinformationRouteName,
} from '../containers/PersonalInformation';



import Appoinment_Detail from '../containers/Appointment/Appoinment_Detail';

import NoAppointment from '../containers/Appointment/noappointment';
import Resetpasspopup, {
  routeName as ResetpasspopupRouteName,
} from '../containers/ForgotPassword/Repasspopup';
import PaymentsMethods, {
  routeName as PaymentsMethodsRouteName,
} from '../containers/PaymentsMethods/index';
import Signup, { routeName as SignupRouteName } from '../containers/SignUp';
import Accountcreated, {
  routeName as AccountcreatedRouteName,
} from '../containers/SignUp/Accountcreated';
import Profilepic, {
  routeName as ProfilepicRouteName,
} from '../containers/SignUp/Profilepic';
import Verification, {
  routeName as VerificationRouteName,
} from '../containers/ForgotPassword/Verification';
import ForgotPassword, {
  routeName as forgotPasswordRouteName,
} from '../containers/ForgotPassword';
import Profilegender, {
  routeName as ProfilegenderRouteName,
} from '../containers/SignUp/Profilegender';
import Terms, {
  routeName as TermsRoute,
} from '../containers/Terms/index';
import AddNewCard, {
  routeName as AddNewCardRouteName,
} from '../containers/AddnewCard/index';
import SucessFullCard, {
  routeName as SucessFullCardRouteName,
} from '../containers/SucessFullcard/index';
import SavedCard, {
  routeName as SavedCardRouteName,
} from '../containers/SavedCard/index';
import OrderSummary, {
  routeName as ordersummaryRouteName,
} from '../containers/Order/OrderSummary';
import Login, { routeName as loginRouteName } from '../containers/Login';
import Resetpass, {
  routeName as ResetpassRouteName,
} from '../containers/ForgotPassword/Resetpass';
import Profilenum, {
  routeName as ProfilenumRouteName,
} from '../containers/SignUp/profilenum';
import TransactionLists, {
  routeName as TransactionListsRouteName,
} from '../containers/TransactionLists/index';
import Favorites, {
  routeName as FavoritesRouteName,
} from '../containers/Favorites/index';
import ReferEarn, {
  routeName as ReferEarnRouteName,
} from '../containers/ReferEarn/index';
import ManageSettings, {
  routeName as ManageSettingsRouteName,
} from '../containers/ManageSettings';
import ChangeLanguage, {
  routeName as ChangeLanguageRouteName,
} from '../containers/ChangeLanguage';
import BlogInternal, {
  routeName as BlogInternalRouteName,
} from '../containers/Blog/BlogInternal';
import BlogInternalCommet, {
  routeName as BlogInternalCommetRouteName,
} from '../containers/Blog/BlogInternalCommet';

import Appoinment_Emoji from '../containers/Appointment/Appoinment_Emoji';
import Appoinment_TopTab from '../containers/Appointment/Appoinment_TopTab';
import Home_NotificationEmpty from '../containers/Home/Home_NotificationEmpty';
import Home_Notification from '../containers/Home/Home_Notification';
import HomeSearch from '../containers/Home/HomeSearch';
import HomeMap from '../containers/Home/HomeMap';
import InternalServices, {
  routeName as InternalServicesRouteName,
} from '../containers/InternalServices';
import ShowImage, {
  routeName as ShowImageRouteName,
} from '../containers/InternalServices/photos/showImage';
import ShowVideo, {
  routeName as ShowVideoRouteName,
} from '../containers/InternalServices/photos/showVideo';
import Bookinggender, {
  routeName as BookinggenderRouteName,
} from '../containers/Booking/Bookinggender';
import Bookingservices, {
  routeName as BookingservicesRouteName,
} from '../containers/Booking/Bookingservices';
import BookingDate, {
  routeName as BookingDateRouteName,
} from '../containers/Booking/BookingDate';
import OrderSumCoupan, {
  routeName as OrderSumCoupanRouteName,
} from '../containers/Order/OrderSumCoupan';
import PaymentPop from '../containers/Order/PaymentPop';
import PaymentSuccess from '../containers/Order/PaymentSucces';
import PopularBlogViewAll from '../containers/Home/PopularBlogViewAll';
import SavedCards from '../containers/Home/SavedCards';
import SkipUser from '../containers/Home/SkipUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ValueFixed = false;

function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={loginRouteName} component={Login} />
      <Stack.Screen name={onboardinRouteName} component={Onboarding} />
      <Stack.Screen name={SignupRouteName} component={Signup} />
      <Stack.Screen name={AccountcreatedRouteName} component={Accountcreated} />
      <Stack.Screen name={ProfilegenderRouteName} component={Profilegender} />
      <Stack.Screen name={ProfilepicRouteName} component={Profilepic} />
      <Stack.Screen name={ProfilenumRouteName} component={Profilenum} />
      <Stack.Screen name={forgotPasswordRouteName} component={ForgotPassword} />
      <Stack.Screen name={VerificationRouteName} component={Verification} />
      <Stack.Screen name={ResetpassRouteName} component={Resetpass} />
      <Stack.Screen name={ResetpasspopupRouteName} component={Resetpasspopup} />
    </Stack.Navigator>
  );
}

function HomeStackNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name={homeRouteName}
        component={Home}
        options={() => {
          navigation.setOptions({ tabBarVisible: true });
        }}
      />

      <Stack.Screen
        name={'PopularBlogViewAll'}
        component={PopularBlogViewAll}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={'HomeNotificationEmpty'}
        component={Home_NotificationEmpty}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={'HomeNotification'}
        component={Home_Notification}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={'HomeSearch'}
        component={HomeSearch}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={'HomeMap'}
        component={HomeMap}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={InternalServicesRouteName}
        component={InternalServices}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={ShowImageRouteName}
        component={ShowImage}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={ShowVideoRouteName}
        component={ShowVideo}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={BookinggenderRouteName}
        component={Bookinggender}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={BookingservicesRouteName}
        component={Bookingservices}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={BookingDateRouteName}
        component={BookingDate}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={ordersummaryRouteName}
        component={OrderSummary}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={OrderSumCoupanRouteName}
        component={OrderSumCoupan}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={'PaymentPop'}
        component={PaymentPop}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={PaymentsMethodsRouteName}
        component={PaymentsMethods}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />


      <Stack.Screen
        name={AddNewCardRouteName}
        component={AddNewCard}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={SucessFullCardRouteName}
        component={SucessFullCard}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />



      <Stack.Screen
        name={'SavedCards'}
        component={SavedCards}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
    </Stack.Navigator>
  );
}

async function GetData() {
  try {
    const data = await AsyncStorage.getItem('UserData');

    const AsyncValue = JSON.parse(data);
    if (!AsyncValue) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('Errror from Tab Navigator AsyncStorage.......', error);
  }

}

function AppointmentStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={GetData() ? 'NewUser' : 'NoAppinment'}>
      {/* <Stack.Screen
        name={'NewUser'}
        component={SkipUser}
        initialParams={{Appoinment: true}}
      /> */}

      <Stack.Screen
        name={'NoAppinment'}
        component={NoAppointment}
        options={() => {
          navigation.setOptions({ tabBarVisible: true });
        }}
      />
      <Stack.Screen
        name={'Appoinment_TopTab'}
        component={Appoinment_TopTab}
        options={() => {
          navigation.setOptions({ tabBarVisible: true });
        }}
      />

      <Stack.Screen
        name={'Appoinment_Detail'}
        component={Appoinment_Detail}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={'Emoji'}
        component={Appoinment_Emoji}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen name={appointmentRouteName} component={Appointment} />
    </Stack.Navigator>
  );
}

function AddStackNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={'HomeMap'}
        component={HomeMap}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

    </Stack.Navigator>
  );
}

function BlogStackNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={blogRouteName}
        component={Blog}
        options={() => props.navigation.setOptions({ tabBarVisible: true })}
      />
    </Stack.Navigator>
  );
}

function SettingStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={GetData() ? 'NewUser' : 'NoAppinment'}>
      {/* <Stack.Screen
        name={'NewUser'}
        component={SkipUser}
        initialParams={{Appoinment: false}}
      /> */}

      <Stack.Screen
        name={settingRouteName}
        component={Setting}
        options={() => {
          navigation.setOptions({ tabBarVisible: true });
        }}
      />
      <Stack.Screen
        name={PersonalinformationRouteName}
        component={Personalinformation}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={PaymentsMethodsRouteName}
        component={PaymentsMethods}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={homeRouteName}
        component={Home}
        options={() => {
          navigation.setOptions({ tabBarVisible: true });
        }}
      />

      <Stack.Screen
        name={'AddNewCard'}
        component={AddNewCard}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={SucessFullCardRouteName}
        component={SucessFullCard}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={TermsRoute}
        component={Terms}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />

      <Stack.Screen
        name={TransactionListsRouteName}
        component={TransactionLists}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={FavoritesRouteName}
        component={Favorites}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={ManageSettingsRouteName}
        component={ManageSettings}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={ChangeLanguageRouteName}
        component={ChangeLanguage}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
      <Stack.Screen
        name={ReferEarnRouteName}
        component={ReferEarn}
        options={() => {
          navigation.setOptions({ tabBarVisible: false });
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}
      backBehavior="initialRoute"
    // keyboardHidesTabBar={false}
    >
      <Tab.Screen name={homeRouteName} options={{ unmountOnBlur: true }} component={HomeStackNavigator} />
      {/* <Tab.Screen
        name={appointmentRouteName}
        options={{unmountOnBlur: true}}
        component={AppointmentStackNavigator}
      /> */}
      {/* <Tab.Screen name={addRouteName} component={AddStackNavigator} /> */}

      <Tab.Screen name={blogRouteName} options={{ unmountOnBlur: true }} component={TransactionLists} />
      <Tab.Screen name={settingRouteName} component={SettingStackNavigator} />
    </Tab.Navigator>
  );
}

export default function App() {


  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name={BlogInternalRouteName} component={BlogInternal} />
        <Stack.Screen
          name={'Appoinment_Detail'}
          component={Appoinment_Detail}
        // options={() => {
        //   navigation.setOptions({ tabBarVisible: false });
        // }}
        />
        <Stack.Screen
          name={BlogInternalCommetRouteName}
          component={BlogInternalCommet}
        />
        <Stack.Screen name={'NewUser'} component={SkipUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
