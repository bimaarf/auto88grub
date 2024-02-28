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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        actions: <Widget>[
          IconButton(
            icon: const Icon(
              Icons.notifications,
              color: Colors.white,
            ),
            onPressed: () {
              AlertDialog.adaptive(
                title: Text('New Arrival'),
              );
            },
          ),
          IconButton(
            icon: const Icon(
              Icons.settings,
              color: Colors.white,
            ),
            onPressed: () {
              AlertDialog(
                title: Text('asd'),
              );
            },
          )
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
                          Row(
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
                          SizedBox(height: 10),
                          Text(
                            "*Deskripsi:",
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(description), // Display subtitle text here
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
