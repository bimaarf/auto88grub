import 'package:flutter/material.dart';

class CardCarDetail extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String subtitle;
  final String note;
  final String description;

  const CardCarDetail({
    Key? key,
    required this.imageUrl,
    required this.title,
    required this.subtitle,
    required this.description,
    required this.note,
  }) : super(key: key);

  void showUpdateDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Update Car'),
          content: const Text('Car update details here.'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Close'),
            ),
            TextButton(
              onPressed: () {
                // Add logic for updating the car here
                Navigator.of(context).pop();
              },
              child: const Text('Update'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text(title), // Assuming you want to display title in app bar
        actions: <Widget>[
          IconButton(
            icon: const Icon(
              Icons.update,
              color: Colors.white,
            ),
            onPressed: () {
              // Call the update dialog function
              showUpdateDialog(context);
            },
          ),
          IconButton(
            icon: const Icon(
              Icons.notifications,
              color: Colors.white,
            ),
            onPressed: () {
              // Existing notification dialog
            },
          ),
          IconButton(
            icon: const Icon(
              Icons.settings,
              color: Colors.white,
            ),
            onPressed: () {
              // Existing settings dialog
            },
          ),
        ],
      ),
      body: NotificationListener<ScrollNotification>(
        onNotification: (scrollNotification) {
          return false;
        },
        child: Stack(
          children: [
            Positioned.fill(
              child: SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Image.network(
                      imageUrl,
                      height: 275,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                    ListTile(
                      title: Text(
                        title,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                    Container(
                      color: Colors.black45,
                      padding: const EdgeInsets.all(10),
                      width: double.infinity,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Row(
                            children: [
                              Row(
                                children: [
                                  Icon(
                                    Icons.car_crash,
                                    color: Colors.white,
                                  ),
                                  SizedBox(width: 5),
                                  Text(
                                    "MPV",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              SizedBox(width: 15),
                              Row(
                                children: [
                                  Icon(
                                    Icons.settings,
                                    color: Colors.white,
                                  ),
                                  SizedBox(width: 5),
                                  Text(
                                    "4x2",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              SizedBox(width: 15),
                              Row(
                                children: [
                                  Icon(
                                    Icons.local_gas_station_sharp,
                                    color: Colors.white,
                                  ),
                                  SizedBox(width: 5),
                                  Text(
                                    "Premium",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              SizedBox(width: 15),
                              Row(
                                children: [
                                  Icon(
                                    Icons.chair,
                                    color: Colors.white,
                                  ),
                                  SizedBox(width: 5),
                                  Text(
                                    "3 Rows",
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 10),
                          const Text(
                            "*Deskripsi:",
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 5),
                          Text(description),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            AnimatedBuilder(
              animation: ModalRoute.of(context)!.animation!,
              builder: (context, child) {
                return Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        InkWell(
                          onTap: () {},
                          child: const Icon(Icons.stars,
                              color: Colors.red, size: 30),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
