#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node *next;

    Node(int val)
    {
        data = val;
        next = NULL;
    }
};

class Queue
{
private:
    Node *front;
    Node *rear;

public:
    Queue()
    {
        front = rear = NULL;
    }

    void enqueue(int x)
    {
        Node *temp = new Node(x);
        if (rear == NULL)
        {
            front = rear = temp;
            return;
        }

        rear->next = temp;
        rear = temp;
    }
    void dequeue()
    {
        if (front == NULL)
        {
            cout << "Queue is empty\n";
            return;
        }

        Node *temp = front;
        front = front->next;

        if (front == NULL)
            rear = NULL;

        delete temp;
    }

    int peek()
    {
        if (front == NULL)
        {
            cout << "Queue is empty\n";
            return -1;
        }
        return front->data;
    }

    bool isEmpty()
    {
        return (front == NULL);
    }

    void display()
    {
        if (front == NULL)
        {
            cout << "Queue is empty\n";
            return;
        }

        Node *temp = front;
        while (temp != NULL)
        {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }
};

int main()
{
    Queue q;

    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);

    q.display();

    q.dequeue();
    q.display();

    cout << "Front: " << q.peek() << endl;

    return 0;
}