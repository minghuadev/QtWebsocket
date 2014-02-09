#-------------------------------------------------
#
# Project created by QtCreator 2014-02-09T16:10:15
#
#-------------------------------------------------

QT       += core gui network

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = InfoposterDemo
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    Server.cpp \
    eventfilter.cpp

HEADERS  += mainwindow.h \
    Server.h \
    eventfilter.h

FORMS    += mainwindow.ui

win32:CONFIG(release, debug|release): LIBS += -L$$OUT_PWD/../QtWebsocket/release/ -lQtWebsocket
else:win32:CONFIG(debug, debug|release): LIBS += -L$$OUT_PWD/../QtWebsocket/debug/ -lQtWebsocket
else:unix: LIBS += -L$$OUT_PWD/../QtWebsocket/ -lQtWebsocket

INCLUDEPATH += $$PWD/../QtWebsocket
DEPENDPATH += $$PWD/../QtWebsocket

win32-g++:CONFIG(release, debug|release): PRE_TARGETDEPS += $$OUT_PWD/../QtWebsocket/release/libQtWebsocket.a
else:win32-g++:CONFIG(debug, debug|release): PRE_TARGETDEPS += $$OUT_PWD/../QtWebsocket/debug/libQtWebsocket.a
else:win32:!win32-g++:CONFIG(release, debug|release): PRE_TARGETDEPS += $$OUT_PWD/../QtWebsocket/release/QtWebsocket.lib
else:win32:!win32-g++:CONFIG(debug, debug|release): PRE_TARGETDEPS += $$OUT_PWD/../QtWebsocket/debug/QtWebsocket.lib
else:unix: PRE_TARGETDEPS += $$OUT_PWD/../QtWebsocket/libQtWebsocket.a
