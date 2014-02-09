TEMPLATE = subdirs

SUBDIRS += \
    QtWebsocket \
    InfoposterDemo

Client.depends = QtWebsocket
Server.depends = QtWebsocket
ServerThreaded.depends = QtWebsocket
AutobahnTestSuite.depends = QtWebsocket
