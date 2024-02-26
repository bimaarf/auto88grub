import 'package:flutter/material.dart';
import 'package:frontend/Pages/Cars.dart';
import 'package:frontend/Pages/Home.dart';
import 'package:frontend/Pages/Message.dart';
import 'package:frontend/Pages/Profile.dart';

void main() => runApp(const NavigationBarApp());

class NavigationBarApp extends StatelessWidget {
  const NavigationBarApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.white,
        colorScheme: const ColorScheme.dark(
          background: Color.fromARGB(185, 0, 0, 0),
        ),
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.white,
        colorScheme: const ColorScheme.dark(
          background: Color.fromARGB(185, 0, 0, 0),
        ),
      ),
      themeMode: ThemeMode.dark,
      home: const NavigationExample(),
    );
  }
}

class NavigationExample extends StatefulWidget {
  const NavigationExample({Key? key}) : super(key: key);

  @override
  State<NavigationExample> createState() => _NavigationExampleState();
}

class _NavigationExampleState extends State<NavigationExample> {
  int _currentPageIndex = 0;

  void _onDestinationSelected(int index) {
    setState(() {
      _currentPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context); // Define theme here

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
            label: 'Notiffication',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.person, color: Colors.white),
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
      body: <Widget>[
        Card(
          color: Colors.white,
          shadowColor: Colors.white,
          margin: EdgeInsets.zero,
          child: SizedBox.expand(
            child: SizedBox.expand(
              child: Cars(theme: theme),
            ),
          ),
        ),
        MessageListView(theme: theme).build(),
        Card(
          color: Colors.white,
          shadowColor: Colors.white,
          margin: EdgeInsets.zero,
          child: SizedBox.expand(
            child: Home(theme: theme),
          ),
        ),
        const Card(
          child: ListTile(
            leading: Icon(
              Icons.notifications_sharp,
              color: Colors.white,
            ),
            title: Text('Notification 2'),
            subtitle: Text('This is a notification'),
          ),
        ),
        const ProfileScreen(),
      ][_currentPageIndex],
    );
  }
}
