#include <iostream>
using namespace std;

int linearsearch(int arr[], int size, int key)
{
    for (int i = 0; i < size; i++)
    {
        if (arr[i] == key)
        {
            cout << "Element present at index " << i << endl;
            return i; // stop searching after finding the key
        }
    }
    cout << "Element not present" << endl;
    return -1;
}

int main()
{
    int arr[] = {1, 2, 3};
    int size = 3;
    int key;

    cout << "Enter the key: ";
    cin >> key;

    linearsearch(arr, size, key);
    return 0;
}
