"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Radio } from '@/components/ui/Radio';
import CustomButton from '@/components/ui/Button';
import { Send } from 'lucide-react';

interface ShareSectionProps {
    onClose: () => void;
}
const ShareSection: React.FC<ShareSectionProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        privacyOption: 'yes'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        onClose();
    };

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm min-h-[90vh] flex justify-center items-center">
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-semibold text-[#2E5C8A] mb-6">
                    Receive a copy of your results by email
                </h2>
                <div className="flex justify-between items-center mb-6 w-full">
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        <div className="flex items-center gap-6 w-full">
                            <label className="font-medium text-gray-700 w-1/4">Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                                className="w-full min-w-80"
                            />
                        </div>

                        <div className="flex items-center gap-6 w-full">
                            <label className="font-medium text-gray-700 w-1/4">Email Address</label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                className="w-full min-w-80"
                            />
                        </div>
                    </form>
                </div>


                <hr className="my-6 border-t-2 border-gray-200"/>

                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <p className="text-sm text-gray-600 mb-4">
                        Your privacy is safe with us. We promise not to sell, give away or otherwise disclose your
                        information to anyone, unless required by and in accordance with the law. Please choose one
                        option <span className="text-red-500">*</span>:
                    </p>
                    <div className="flex gap-8">
                        <div className="flex items-center">
                            <Radio
                                name="privacy"
                                value="yes"
                                checked={formData.privacyOption === 'yes'}
                                onChange={(e) => setFormData({...formData, privacyOption: e.target.value})}
                                label="Yes, please send me information"
                            />
                        </div>
                        <div className="flex items-center">
                            <Radio
                                name="privacy"
                                value="no"
                                checked={formData.privacyOption === 'no'}
                                onChange={(e) => setFormData({...formData, privacyOption: e.target.value})}
                                label="No, please do not send me email"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <CustomButton
                        type="submit"
                        variant="runTest"
                        onClick={handleSubmit}
                    >
                        <div className="flex items-center gap-2">
                            <Send size={18}/>
                            <span>Send</span>
                        </div>
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

export default ShareSection;
