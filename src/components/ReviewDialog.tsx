import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StarRating from "./StarRating";
import { toast } from "sonner";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  companyName: string;
  onSubmit: (rating: number, review: string) => void;
  isEmployer?: boolean;
}

const ReviewDialog = ({ open, onOpenChange, jobTitle, companyName, onSubmit, isEmployer = false }: ReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  
  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (review.trim().length < 10) {
      toast.error("Please write at least 10 characters");
      return;
    }
    
    onSubmit(rating, review);
    setRating(0);
    setReview("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            {isEmployer ? (
              <>
                Share your experience working with <span className="font-medium">{companyName}</span> on{" "}
                <span className="font-medium">{jobTitle}</span>
              </>
            ) : (
              <>
                Share your experience working on <span className="font-medium">{jobTitle}</span> at{" "}
                <span className="font-medium">{companyName}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <div className="flex items-center gap-3">
              <StarRating rating={rating} onRatingChange={setRating} size="lg" />
              {rating > 0 && (
                <span className="text-sm text-muted-foreground">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="review">Your Review *</Label>
            <Textarea
              id="review"
              placeholder="Tell us about your experience... What did you like? What could be improved?"
              rows={6}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {review.length}/500 characters
            </p>
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit Review
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
