#include <bits/stdc++.h>
using namespace std;

int longestIncreasingSubsequence(vector<int> &nums)
{
    vector<int> tails;

    for (int num : nums)
    {
        auto it = lower_bound(tails.begin(), tails.end(), num);

        if (it == tails.end())
        {
            tails.push_back(num);
        }
        else
        {
            *it = num;
        }
    }

    return tails.size();
}

int main()
{
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << longestIncreasingSubsequence(nums);
}