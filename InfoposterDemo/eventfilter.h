#ifndef EVENTFILTER_H
#define EVENTFILTER_H

#include <QObject>
#include <QPushButton>

class EventFilter : public QObject
{
    Q_OBJECT
public:
    explicit EventFilter(QPushButton *);

signals:

public slots:

protected:
    QPushButton *doSend;
    bool eventFilter(QObject *, QEvent *);

};

#endif // EVENTFILTER_H
