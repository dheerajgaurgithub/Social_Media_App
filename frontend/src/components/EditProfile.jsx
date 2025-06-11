import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import axios from 'axios';
import { Loader2, Camera, User, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';

const EditProfile = () => {
    const imgRef = useRef();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const [input, setInput] = useState({
        profilePhoto: user?.profilePicture,
        bio: user?.bio || "",
        gender: user?.gender || "",
    });
    const [previewImage, setPreviewImage] = useState(user?.profilePicture); // New state for preview

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, profilePhoto: file });
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl); // Update preview
        }
    };

    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if (input.profilePhoto && typeof input.profilePhoto !== 'string') {
            formData.append("profilephoto", input.profilePhoto);
        }

        try {
            setLoading(true);
            const res = await axios.post(
                "https://social-media-app-u9d1.onrender.com/api/v1/user/profile/edit",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                const updatedUserData = {
                    ...user,
                    bio: res.data.user?.bio,
                    profilePicture: res.data.user?.profilePicture,
                    gender: res.data.user?.gender,
                };
                dispatch(setAuthUser(updatedUserData));
                toast.success(res.data.message);
                navigate(`/profile/${user?._id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Cleanup URL object when component unmounts or image changes
        return () => {
            if (previewImage && typeof previewImage === 'string' && previewImage.startsWith('blob:')) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4 shadow-lg">
                        <Edit3 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Edit Profile
                    </h1>
                    <p className="text-gray-600">
                        Customize your profile information
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                    {/* Profile Photo Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                        <div className="relative group">
                            <Avatar className="w-24 h-24 ring-4 ring-white shadow-lg">
                                <AvatarImage 
                                    src={previewImage} 
                                    alt="Profile" 
                                    className="object-cover" 
                                />
                                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-2xl font-bold">
                                    <User className="w-8 h-8" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                onClick={() => imgRef?.current.click()}>
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                {user?.username}
                            </h2>
                            <p className="text-gray-600 mb-4 whitespace-pre-wrap">
                                {input.bio || "Add a bio to tell people about yourself"}
                            </p>
                            <input
                                ref={imgRef}
                                onChange={fileChangeHandler}
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                            <Button
                                onClick={() => imgRef?.current.click()}
                                variant="outline"
                                size="sm"
                                className="bg-white hover:bg-indigo-50 border-indigo-200 text-indigo-600 hover:text-indigo-700 transition-all duration-200"
                            >
                                <Camera className="w-4 h-4 mr-2" />
                                Change Photo
                            </Button>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="mb-8">
                        <Label htmlFor="bio" className="text-lg font-semibold text-gray-800 mb-3 block">
                            Bio
                        </Label>
                        <div className="relative">
                            <Textarea
                                id="bio"
                                value={input.bio}
                                onChange={(e) => setInput({ ...input, bio: e.target.value })}
                                placeholder="Tell people about yourself..."
                                className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-xl bg-gray-50/50 focus:bg-white transition-all duration-300 text-gray-800 placeholder:text-gray-400"
                                maxLength={150}
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                {input.bio.length}/150
                            </div>
                        </div>
                    </div>

                    {/* Gender Section */}
                    <div className="mb-8">
                        <Label className="text-lg font-semibold text-gray-800 mb-4 block">
                            Gender
                        </Label>
                        <RadioGroup
                            value={input.gender}
                            onValueChange={(value) => setInput({ ...input, gender: value })}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-colors duration-200 cursor-pointer bg-white/50">
                                <RadioGroupItem value="male" id="male" className="border-indigo-400 text-indigo-600" />
                                <Label htmlFor="male" className="font-medium text-gray-700 cursor-pointer">Male</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-colors duration-200 cursor-pointer bg-white/50">
                                <RadioGroupItem value="female" id="female" className="border-indigo-400 text-indigo-600" />
                                <Label htmlFor="female" className="font-medium text-gray-700 cursor-pointer">Female</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-colors duration-200 cursor-pointer bg-white/50">
                                <RadioGroupItem value="other" id="other" className="border-indigo-400 text-indigo-600" />
                                <Label htmlFor="other" className="font-medium text-gray-700 cursor-pointer">Other</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                        <Button
                            onClick={() => navigate(`/profile/${user?._id}`)}
                            variant="outline"
                            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200"
                        >
                            Cancel
                        </Button>
                        {loading ? (
                            <Button 
                                disabled
                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-70"
                            >
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Saving...
                            </Button>
                        ) : (
                            <Button 
                                onClick={editProfileHandler}
                                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                            >
                                Save Changes
                            </Button>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>Changes will be reflected across your profile immediately</p>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
