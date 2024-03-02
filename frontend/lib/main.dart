import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:frontend/Pages/Authentication/login_page.dart';
import 'package:frontend/Pages/Cars.dart';
import 'package:frontend/Pages/Home.dart';
import 'package:frontend/Pages/Profile.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<String?> initializeToken() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  return token;
}

void main() async {
  await dotenv.load();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String?>(
      future: initializeToken(),
      builder: (context, snapshot) {
        final String? token = snapshot.data;
        final isLoggedIn = token != null;
        return MaterialApp(
          theme: ThemeData(
            brightness: Brightness.dark,
            primaryColor: Colors.white,
            iconTheme: const IconThemeData(
                color: Colors.black), // Set icon theme color
            colorScheme: const ColorScheme.dark(
              background: Colors.black,
            ),
          ),
          darkTheme: ThemeData(
            brightness: Brightness.dark,
            primaryColor: Colors.white,
            iconTheme: const IconThemeData(
                color: Colors.black), // Set icon theme color
            colorScheme: const ColorScheme.dark(
              background: Colors.black,
            ),
          ),
          themeMode: ThemeMode.dark,
          initialRoute: isLoggedIn ? '/home' : '/login',
          routes: {
            '/': (context) => NavigationBarApp(isLoggedIn: isLoggedIn),
            '/register': (context) => LoginPage(),
            '/home': (context) => NavigationBarApp(isLoggedIn: isLoggedIn),
            '/profile': (context) => const ProfileScreen(),
            '/login': (context) => LoginPage(),
          },
        );
      },
    );
  }
}

class NavigationBarApp extends StatelessWidget {
  final bool isLoggedIn;

  const NavigationBarApp({Key? key, required this.isLoggedIn})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.white,
        colorScheme: const ColorScheme.dark(
          background: Colors.black,
        ),
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.white,
        colorScheme: const ColorScheme.dark(
          background: Colors.black,
        ),
      ),
      themeMode: ThemeMode.dark,
      home: NavigationExample(isLoggedIn: isLoggedIn),
    );
  }
}

class NavigationExample extends StatefulWidget {
  final bool isLoggedIn;

  const NavigationExample({Key? key, required this.isLoggedIn})
      : super(key: key);

  @override
  State<NavigationExample> createState() => _NavigationExampleState();
}

class _NavigationExampleState extends State<NavigationExample> {
  int _currentPageIndex = 2;

  void _onDestinationSelected(int index) {
    setState(() {
      _currentPageIndex = index;
      if (index == 2 && !widget.isLoggedIn) {
        SharedPreferences.getInstance().then((prefs) {
          prefs.setBool('isLoggedIn', true);
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    late Widget currentPage;
    switch (_currentPageIndex) {
      case 0:
      case 1:
      case 3:
        currentPage = Cars(
          theme: theme,
        );
        break;
      case 2:
        currentPage = Home(theme: theme);
        break;
      case 4:
        currentPage = const ProfileScreen();
        break;
      default:
        currentPage = Home(theme: theme);
        break;
    }

    return Scaffold(
      drawerScrimColor: Colors.white,
      backgroundColor: Colors.black, // Set background color to black
      bottomNavigationBar: NavigationBar(
        onDestinationSelected: _onDestinationSelected,
        backgroundColor: Colors.black,
        selectedIndex: _currentPageIndex,
        destinations: const <Widget>[
          NavigationDestination(
            selectedIcon: Icon(Icons.car_rental_rounded, color: Colors.white),
            icon: Icon(Icons.car_rental_rounded),
            label: 'Cars',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.settings, color: Colors.white),
            icon: Icon(Icons.settings),
            label: 'Main Data',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.home, color: Colors.white),
            icon: Icon(Icons.home_outlined),
            label: 'Home',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.notifications, color: Colors.white),
            icon: Badge(
              label: Text('12+'),
              child: Icon(Icons.notifications),
            ),
            label: 'Notification',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.person, color: Colors.white),
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
      body: currentPage,
    );
  }
}
