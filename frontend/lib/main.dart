import 'package:flutter/material.dart';
import 'package:frontend/Pages/Home.dart';
import 'package:frontend/Pages/Message.dart';
import 'package:frontend/Pages/Profile.dart';

void main() => runApp(const NavigationBarApp());

// Main app widget
class NavigationBarApp extends StatelessWidget {
  const NavigationBarApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(useMaterial3: true),
      home: const NavigationExample(),
    );
  }
}

// Main widget managing the current page index and the body content
class NavigationExample extends StatefulWidget {
  const NavigationExample({Key? key}) : super(key: key);

  @override
  State<NavigationExample> createState() => _NavigationExampleState();
}

// State class containing the state of the NavigationExample widget
class _NavigationExampleState extends State<NavigationExample> {
  int currentPageIndex = 0;

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Scaffold(
      // appBar: AppBar(
      //   title: Text(
      //     'Auto88Group',
      //     style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
      //   ), // Add an app title
      //   backgroundColor: Colors.blue.withOpacity(0.9),
      // ),
      bottomNavigationBar: NavigationBar(
        onDestinationSelected: (int index) {
          setState(() {
            currentPageIndex = index;
          });
        },
        backgroundColor: Colors.white,
        indicatorColor: Colors.lightBlue[600],
        selectedIndex: currentPageIndex,
        destinations: const <Widget>[
          NavigationDestination(
            selectedIcon: Icon(
              Icons.home,
              color: Colors.white,
            ),
            icon: Icon(
              Icons.home_outlined,
            ),
            label: 'Home',
          ),
          NavigationDestination(
            selectedIcon: Icon(
              Icons.notifications_on_sharp,
              color: Colors.white,
            ),
            icon: Badge(
                label: Text('21'), child: Icon(Icons.notifications_active)),
            label: 'Notifications',
          ),
          NavigationDestination(
            selectedIcon: Icon(
              Icons.message,
              color: Colors.white,
            ),
            icon: Badge(
              label: Text('2'),
              child: Icon(Icons.message),
            ),
            label: 'Messages',
          ),
          NavigationDestination(
            selectedIcon: Icon(
              Icons.person,
              color: Colors.white,
            ),
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
      body: <Widget>[
        // Home page
        Card(
          color: Colors.white,
          shadowColor: Colors.white,
          margin: const EdgeInsets.all(0),
          child: SizedBox.expand(child: Home(theme: theme)),
        ),

        // Notifications page
        const Padding(
          padding: EdgeInsets.all(0),
          child: Column(
            children: <Widget>[
              Card(
                child: ListTile(
                  leading: Icon(
                    Icons.notifications_sharp,
                    color: Colors.white,
                  ),
                  title: Text('Notification 1'),
                  subtitle: Text('This is a notification'),
                ),
              ),
              Card(
                child: ListTile(
                  leading: Icon(
                    Icons.notifications_sharp,
                    color: Colors.white,
                  ),
                  title: Text('Notification 2'),
                  subtitle: Text('This is a notification'),
                ),
              ),
            ],
          ),
        ),

        // Messages page
        MessageListView(theme: theme).build(),
        const ProfileScreen(
          profileName: 'Jokowi',
        ),
      ][currentPageIndex],
    );
  }
}
